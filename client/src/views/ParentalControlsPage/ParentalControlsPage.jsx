import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import './ParentalControlsPage.css';
import GradesComponent from '../Grades/Grades';
import { updatePermissions, getPermissions, getPrograms } from '../../Utils/requests';

export default function ParentalControlsPage() {
  const [canChange, setCanChange] = useState(false);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, err } = await getPrograms();
      if (!err) {
        setPrograms(data);
      } else {
        console.error('Error fetching programs:', err);
      }
    };

    fetchPrograms();
  }, [])

  const [learningStandard, setLessonModule] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
            //console.log('Data', res.data.lesson_module);
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

  const [student, setStudent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentMe();
        if (res.data) {
          setStudent(res.data);
        } else {
          message.error(res.err);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  const listStyle = {
    textAlign: 'left',
    justifyContent: 'center',
    padding: '5px',
    marginLeft: '0px',
    marginRight: '0px',
    marginBottom: '40px',
    borderRadius: '5px',

    //backgroundColor: 'rgba(61, 159, 230, 0.45)',
  }

  const columnStyle = {
    flex: 1,
    margin: '10px',
    padding: '10px',
    border: '3px solid #3b719f',
    borderRadius: '10px',
    backgroundColor: 'rgba(61, 159, 230, 0.45)',
    minHeight: '34rem',
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '30px',
  }


  const handleClick = (e) => {
    setCanChange(!canChange);
    //if canChange is now false (just clicked on save) then update the student's permissions statuses
    // updatePermissions("permissionone_viewcoursematerials", isCheckedViewMaterials);
    // updatePermissions("permissiontwo_submitlateassignments", isCheckedSubmitAssignments);
    // updatePermissions("permissionthree_discussionparticipation", isCheckedParticipateDiscussions);
    // updatePermissions("permissionfour_timelimits", isCheckedToggleTimeLimits);
    // updatePermissions("permissionfive_accessresources", isCheckedAccessResources);
    // updatePermissions("permissionsix_receivenotifications", isCheckedReceiveNotifications);
  }

  const renderPerformance = () => {
    //const res = getStudentClassroom();
    //setLessonModule(res.data.lesson_module);
    return <GradesComponent learningStandard={learningStandard} />;
  }

  const [isChecked, setChecked] = useState(false); 


  //const {permissionone} = getPermissions("permissionone_viewcoursematerials");
  const [isCheckedViewMaterials, setCheckedViewMaterials] = useState(false); //replaced automatic falses with actual getPermissions status
  //const [isCheckedViewMaterials, setCheckedViewMaterials] = useState(permissionone); //replaced automatic falses with actual getPermissions status

  //const {permissiontwo} = getPermissions("permissiontwo_submitlateassignments");
  const [isCheckedSubmitAssignments, setCheckedSubmitAssignments] = useState(false);
  //const [isCheckedSubmitAssignments, setCheckedSubmitAssignments] = useState(permissiontwo);

  //const {permissionthree} = getPermissions("permissionthree_discussionparticipation");
  const [isCheckedParticipateDiscussions, setCheckedParticipateDiscussions] = useState(false);
  //const [isCheckedParticipateDiscussions, setCheckedParticipateDiscussions] = useState(permissionthree);

  //const {permissionfour} = getPermissions("permissionfour_timelimits");
  const [isCheckedToggleTimeLimits, setCheckedToggleTimeLimits] = useState(false);
  //const [isCheckedToggleTimeLimits, setCheckedToggleTimeLimits] = useState(permissionfour);

  //const {permissionfive} = getPermissions("permissionfive_accessresources");
  const [isCheckedAccessResources, setCheckedAccessResources] = useState(false);
  //const [isCheckedAccessResources, setCheckedAccessResources] = useState(permissionfive);

  //const {permissionsix} = getPermissions("permissionsix_receivenotifications");
  const [isCheckedReceiveNotifications, setCheckedReceiveNotifications] = useState(false);
  //const [isCheckedReceiveNotifications, setCheckedReceiveNotifications] = useState(permissionsix);

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div className='page-title'>Parental Controls</div>
        </div>

        <div style={{ display: 'flex' }}>
          {/* Student Projects Section */}
          <div style={columnStyle}>
            <h2>Student Projects</h2>
            <div id='program-list' style={listStyle}>
              <ul>
                {programs.map((program) => (
                  <Link className='link' to={`/sandbox`} key={program.id}>
                    <li id={program.id}>{program.title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Grades Section */}
          <div style={columnStyle} id='grades-programs-container'> 
              {renderPerformance()}
            </div>

          {/* Student Permissions Section */}
          <div style={columnStyle}>
            <h2>Student Permissions</h2>
            <ToggleSwitch
              label="View Course Materials"
              isChecked={isCheckedViewMaterials}
              onChange={() => { if (canChange) { setCheckedViewMaterials(!isCheckedViewMaterials); } }}
              disabled={!canChange}
            />
            <ToggleSwitch
              label="Submit late assignments"
              isChecked={isCheckedSubmitAssignments}
              onChange={() => { if (canChange) { setCheckedSubmitAssignments(!isCheckedSubmitAssignments); } }}
              disabled={!canChange} />
            <ToggleSwitch
              label="Participate in public discussions"
              isChecked={isCheckedParticipateDiscussions}
              onChange={() => { if (canChange) { setCheckedParticipateDiscussions(!isCheckedParticipateDiscussions); } }}
              disabled={!canChange} />
            <ToggleSwitch
              label="Toggle time limits"
              isChecked={isCheckedToggleTimeLimits}
              onChange={() => { if (canChange) { setCheckedToggleTimeLimits(!isCheckedToggleTimeLimits); } }}
              disabled={!canChange} />
            <ToggleSwitch
              label="Access outside resources"
              isChecked={isCheckedAccessResources}
              onChange={() => { if (canChange) { setCheckedAccessResources(!isCheckedAccessResources); } }}
              disabled={!canChange} />
            <ToggleSwitch
              label="Receive notifications"
              isChecked={isCheckedReceiveNotifications}
              onChange={() => { if (canChange) { setCheckedReceiveNotifications(!isCheckedReceiveNotifications); } }}
              disabled={!canChange} />
            <div id='add-button' style={buttonStyle}>
              <button onClick={handleClick}>
                {canChange ? "Save Permissions" : "Edit Permissions"}
              </button>
              {/**/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};