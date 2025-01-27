import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import{ getSaved } from '../../Utils/requests';
import{ getStudentMe } from '../../Utils/requests';
import Calendar from 'react-calendar';
import GradesComponent from '../Grades/Grades';
import './Assignments.less';

function Assignments() {
  const [learningStandard, setLessonModule] = useState({});
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [saves, setSaves] = useState({});
  const [sharedWith, setSharedWith] = useState([]);
  const [idOfStudentLoggedin, setIdOfStudentLoggedin] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');
  const navigate = useNavigate();

  // load relevant information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
  
          if (res.data.lesson_module.activities) {
            setActivities(res.data.lesson_module.activities);
          }
        } else {
          message.error(res.err);
        }
        const s = await getStudentMe();
        const studentID = s.data.students[0].id;
        const studentName = s.data.students[0].name;
        
        const savesRes = await getSaved();
    
        const savesForLoggedInStudent = savesRes.data.filter((save) => {
          return save.students.some((student) => student.id === studentID);
        });
        
        const allStudentsInProjects = savesForLoggedInStudent.flatMap((save) =>
          save.students.map((student) => student.name)
        );
    
        const uniqueStudentsInProjects = [...new Set(allStudentsInProjects)];
    
        setSharedWith(uniqueStudentsInProjects.filter((name) => name !== studentName));        setIdOfStudentLoggedin(studentID);
        if (savesForLoggedInStudent) {
          try {
            setSaves(savesForLoggedInStudent);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    
  
    fetchData();
  }, []);

  // open workspace if an activity is selected
  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));
    navigate('/workspace');
  };

  // render the 'shared with' component
const renderSharedWith = () => {
  return (
    <div id='shared-with-section'>
      <h1 id='shared-with-title'>Shared Projects With:</h1>
      {/* if projects have been shared, render them. otherwise, print a message  */}
      {sharedWith.length > 0 ? (
        sharedWith.map((shared) => (
          <div key={shared} className='shared-with-item'>
            {`${shared}`}
          </div>
        ))
      ) : (
        <p>You have not shared projects with anyone.</p>
      )}
    </div>
  );
};

  // if a past program is selected, open it
  const handleSaves = (activity) =>{
    activity.lesson_module_name = saves.activity;
    localStorage.setItem('my-activity', JSON.stringify(activity));
    navigate('/workspace');
  }

  // render separate grade component to display performance
  const renderPerformance = () => {
    return <GradesComponent learningStandard={learningStandard} />;
  };

  // render past programs component
  const renderPastPrograms = () => {
  
    return (
      <div id='past-programs-section'>
        <h1 id='past-programs-title'>Past Programs</h1>
        <ul>
          {/* if past programs can be found, display them. otherwise, print a message  */}
          {saves.length > 0 ? (
            saves.map((save) => (
              <div key={save.activity.id} onClick={() => handleSaves(save.activity)}>
                <button className='past-program-button'>
                  {`${save.activity.StandardS}: ${save.activity.number}`}
                  </button>
              </div>
            ))
          ) : (
            <div>
              <p>You have no past programs.</p>
            </div>
          )}
        </ul>
      </div>
    );
  };

  // for a given activity, render its due date via backend
  const renderDueDates = (activities) => {
    const formatDate = (dueDate) => {
      const options = { month: 'long', day: 'numeric' , timeZone: 'UTC'};
      const date = new Date(dueDate);
      return date.toLocaleDateString('en-US', options);
    };
  
    return (
      <div>
        {/* if activities can be found, render their due dates. otherwise, print a message  */}
        {Array.isArray(activities) && activities.length > 0 ? (
          <ul>
            {activities.map((activity, index) => (
              <div key={index} className="list-item-wrapper">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <li
                   style={{
                    flex: 1,
                    backgroundColor: isPastDue(activity.due_dates) ? '#FF3232' : '#4CA64C', // will be red if past due, green otherwise
                    padding: '3px',
                    borderRadius: '10px',
                    marginLeft: '5vh',
                    color: '#414141',
                    fontSize: '1.5vh',
                    border: '1.5px solid #414141',
                  }}
                  >
                    {`Due Date: ${formatDate(activity.due_dates)}`}
                  </li>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No due dates available.</p>
        )}
      </div>
    );
  };
  
  // check if an assignment is past due
  const isPastDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    return now > due;
  };
  
// change date on calendar  
const handleDateChange = (date) => {
  setSelectedDate(date);
   const formattedDate = date.toISOString().split('T')[0];
   const dueActivity = activities.find((activity) => activity.due_dates === formattedDate);
   setSelectedActivity(dueActivity);
};

// calendar helper function
const tileContent = ({ date, view }) => {
  if (view === 'month') {
    const formattedDate = date.toISOString().split('T')[0];
    const dueActivities = activities.filter(
      (activity) => activity.due_dates === formattedDate
    );

    return (
      <div className="calendar-due-date">
        {dueActivities.map((activity) => (
          <div key={activity.id} className="calendar-due-date-item">
            {activity.activity_name}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

  // assignments component
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>Select your Activity</div>
        </div>
        <div id='classroom-container'>
          <div id='activity-calendar-container'>
            {/* display activities and their due date  */}
            <div id='activity-list-section'>
              <ul>
                {/* if activities can be found, display them. If not, print a message  */}
                {learningStandard.activities ? (
                  learningStandard.activities
                    .sort((activity1, activity2) => activity1.number - activity2.number)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        id='list-item-wrapper'
                        onClick={() => handleSelection(activity)}
                      >
                        <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                        
                        {renderDueDates([activity])} 
                      </div>
                    ))
                ) : (
                  <div>
                    <p>There is currently no active learning standard set.</p>
                    <p>
                      When your classroom manager selects one, it will appear here.
                    </p>
                  </div>
                )}
              </ul>
            </div>
            {/* display calendar to represent due dates  */}
            <div id='calendar-container'>
              <div id='calendar-textbox'>
                <h2 style={{ height: '50%', margin: '0px'}}>Selected Date: {selectedDate && selectedDate.toLocaleDateString()}</h2>
                {selectedActivity && (
                    <h2 style={{ height: '50%', margin: '0px'}}>Activity Due on Selected Date: {`${learningStandard.name}: ${selectedActivity.number}`}</h2>
                )}
              </div>

              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
              />
            </div>
          </div>
          {/* display grades, past programs, and shared with  */}
          <div id='grades-programs-container'> 
            {/* tab system to switch between view  */}
            <div id='tab-taskbar'>
              <button className={activeTab === 'tab1' ? 'active-tab' : ''} onClick={() => setActiveTab('tab1')}>
                Performance and Grades
              </button>
              <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => setActiveTab('tab2')}>
                Past Programs
              </button>
              <button className={activeTab === 'tab3' ? 'active-tab' : ''} onClick={() => setActiveTab('tab3')}>
                  Shared With
              </button>
          </div>

            <div style={{ height: '90%'}}>
              {/* render display based on selected tab  */}
              {activeTab === 'tab1' && <div className="content" style={{height: '100%'}}>{renderPerformance()}</div>}
              {activeTab === 'tab2' && <div className="content" style={{height: '100%'}}>{renderPastPrograms()}</div>}
              {activeTab === 'tab3' && <div className="content" style={{height: '100%'}}>{renderSharedWith()}</div>}
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Assignments;
