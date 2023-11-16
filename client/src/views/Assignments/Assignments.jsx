import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import Calendar from 'react-calendar';
import './Assignments.less';

function Assignments() {
  const [learningStandard, setLessonModule] = useState({});
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));
    navigate('/workspace');
  };

  const renderPrograms = () => {
    return (
      <div id='grades-section'>
        <h1 id='grades-title'>Performance and Grades</h1>
        {learningStandard.programs ? (
          learningStandard.programs.map((program) => (
            <div key={program.id} className='program-section'>
              <div className='program-name'>{program.name}</div>
              <div className='program-grade'>{program.grade}</div>
            </div>
          ))
        ) : (
          <p>No programs available.</p>
        )}
      </div>
    );
  };

  const renderDueDates = (activities) => {
    const formatDate = (dueDate) => {
      const options = { month: 'long', day: 'numeric' , timeZone: 'UTC'};
      const date = new Date(dueDate);
      return date.toLocaleDateString('en-US', options);
    };
  
    return (
      <div>
        {Array.isArray(activities) && activities.length > 0 ? (
          <ul>
            {activities.map((activity, index) => (
              <div key={index} className="list-item-wrapper">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <li
                   style={{
                    flex: 1,
                    backgroundColor: isPastDue(activity.due_dates) ? '#FF3232' : '#4CA64C',
                    padding: '5px',
                    borderRadius: '5px',
                    marginLeft: '9vh', 
                    color: '#000000', 
                    fontSize: '2vh', 
                    border: '2px solid #000000', 
                    marginBottom: '30px', 
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
  
  const isPastDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    return now > due;
  };
  
  
const handleDateChange = (date) => {
  setSelectedDate(date);
   const formattedDate = date.toISOString().split('T')[0];
   console.log("formatted date: ",formattedDate ); 
   const dueActivity = activities.find((activity) => activity.due_dates === formattedDate);
   console.log("activites: ",dueActivity ); 
   setSelectedActivity(dueActivity);
};

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

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>Select your Activity</div>
        </div>
        <div id='activity-list-section'>
          <ul>
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
                    <span style={{ marginLeft: '10px' }}></span>
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
          <div id='calendar-container'>
          <h2>Selected Date: {selectedDate && selectedDate.toLocaleDateString()}</h2>
          {selectedActivity && (
            <div>
              <h2>Activity Due on Selected Date: {`${learningStandard.name}: ${selectedActivity.number}`}</h2>
            </div>
          )}

          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
          />
        </div>
          
        {renderPrograms()}
        
        </div>
      </div> 
  );
}

export default Assignments;
