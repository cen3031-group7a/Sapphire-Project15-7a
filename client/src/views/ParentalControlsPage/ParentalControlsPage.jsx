import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import './ParentalControlsPage.css';
import GradesComponent from '../Grades/Grades';
import { updatePermissions, getPermissions, getPrograms, getStudentClassroom, getStudentSpecific } from '../../Utils/requests';

export default function ParentalControlsPage() {
  const [canChange, setCanChange] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [learningStandard, setLessonModule] = useState({});

  useEffect(() => {
    //get the students current programs to load into student programs section
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


  const [student, setStudent] = useState({});
  useEffect(() => {
    // Fetch the current student information here and update the state
    getStudentSpecific(32).then((res) => {
      if (res.data) {
        setStudent(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, []);
  
  const listStyle = {
    textAlign: 'left',
    justifyContent: 'center',
    padding: '5px',
    marginLeft: '0px',
    marginRight: '0px',
    marginBottom: '40px',
    borderRadius: '5px',
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
    //style for Edit Permissions button
    display: 'flex',
    justifyContent: 'center',
    marginRight: '30px',
  }


  const handleClick = (e) => {
    setCanChange(!canChange);
    //if canChange is now false (just clicked on save) then update the student's permissions statuses
    if (canChange == false) {
      //updatePermissions("permissionone_viewcoursematerials", isCheckedViewMaterials);
      // updatePermissions("permissiontwo_submitlateassignments", isCheckedSubmitAssignments);
      // updatePermissions("permissionthree_discussionparticipation", isCheckedParticipateDiscussions);
      // updatePermissions("permissionfour_timelimits", isCheckedToggleTimeLimits);
      // updatePermissions("permissionfive_accessresources", isCheckedAccessResources);
      // updatePermissions("permissionsix_receivenotifications", isCheckedReceiveNotifications);
    }
  }

  const renderPerformance = () => {
    return <GradesComponent learningStandard={learningStandard} />;
  }

  //following code sets the buttons to be at the true or false value which is currently in the backend
  const [isCheckedViewMaterials, setCheckedViewMaterials] = useState(false);
  useEffect(() => {
    // Update state only when student.permissionone_viewcoursematerials changes
    if (student.permissionone_viewcoursematerials === true) {
      setCheckedViewMaterials(true);
    } else {
      setCheckedViewMaterials(false);
    }
  }, [student.permissionone_viewcoursematerials]);
  
  const [isCheckedSubmitAssignments, setCheckedSubmitAssignments] = useState(false);
  useEffect(() => {
    if (student.permissiontwo_submitlateassignments === true) {
      setCheckedSubmitAssignments(true);
    } else {
      setCheckedSubmitAssignments(false);
    }
  }, [student.permissiontwo_submitlateassignments]);
  
  const [isCheckedParticipateDiscussions, setCheckedParticipateDiscussions] = useState(false);
  useEffect(() => {
    if (student.permissionthree_discussionparticipation === true) {
      setCheckedParticipateDiscussions(true);
    } else {
      setCheckedParticipateDiscussions(false);
    }
  }, [student.permissionthree_discussionparticipation]);
 
  const [isCheckedToggleTimeLimits, setCheckedToggleTimeLimits] = useState(false);
  useEffect(() => {
    if (student.permissionfour_timelimits === true) {
      setCheckedToggleTimeLimits(true);
    } else {
      setCheckedToggleTimeLimits(false);
    }
  }, [student.permissionfour_timelimits]);

  const [isCheckedAccessResources, setCheckedAccessResources] = useState(false);
  useEffect(() => {
    if (student.permissionfive_accessresources === true) {
      setCheckedAccessResources(true);
    } else {
      setCheckedAccessResources(false);
    }
  }, [student.permissionfive_accessresources]);

  const [isCheckedReceiveNotifications, setCheckedReceiveNotifications] = useState(false);
  useEffect(() => {
    if (student.permissionsix_receivenotifications === true) {
      setCheckedReceiveNotifications(true);
    } else {
      setCheckedReceiveNotifications(false);
    }
  }, [student.permissionsix_receivenotifications]);


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
                  //display previously retrieved programs
                  <Link className='link' to={`/sandbox`} key={program.id}>
                    <li id={program.id}>{program.title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Grades Section */}
          <div style={columnStyle} id='grades-programs-container'> 
              {//use grades component to display student performance
              renderPerformance()}
            </div>

          {/* Student Permissions Section */}
          <div style={columnStyle}>
            <h2>Student Permissions</h2>
            {/*show the different buttons with attached text then edit permissions button at bottom*/}
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
                {//if not yet clicked display as edit permissions, if has been clicked it is now the save permissions button
                canChange ? "Save Permissions" : "Edit Permissions"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};