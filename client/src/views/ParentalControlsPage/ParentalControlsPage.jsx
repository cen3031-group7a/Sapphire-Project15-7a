import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch"; 
import './ParentalControlsPage.css';
import GradesComponent from '../Grades/Grades';
import { updatePermissions, getPermissions } from '../../Utils/requests';

export default function ParentalControlsPage() {
  const listStyle = {
    textAlign: 'left',
    justifyContent: 'center',
    padding: '5px',
    marginLeft: '40px',
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
    minHeight: '620px',
  };  

  const buttonStyle = {
    display: 'flex', 
    justifyContent: 'center',
    marginRight: '30px',
  }

  const [canChange, setCanChange] = useState(false);
  const handleClick = (e) => {
    setCanChange(!canChange);
    //if canChange is now false (just clicked on save) then update the student's permissions statuses
    updatePermissions("permissionone_viewcoursematerials", isCheckedViewMaterials);
    updatePermissions("permissiontwo_submitlateassignments", isCheckedSubmitAssignments);
    updatePermissions("permissionthree_discussionparticipation", isCheckedParticipateDiscussions);
    updatePermissions("permissionfour_timelimits", isCheckedToggleTimeLimits);
    updatePermissions("permissionfive_accessresources", isCheckedAccessResources);
    updatePermissions("permissionsix_receivenotifications", isCheckedReceiveNotifications);
  }

  const [learningStandard, setLessonModule] = useState({});
  const renderPerformance = () => {
    return <GradesComponent learningStandard={learningStandard} />;
  }

  const [isChecked, setChecked] = useState(false); 
  const {permissionone} = getPermissions("permissionone_viewcoursematerials");
  console.log(permissionone);
  const [isCheckedViewMaterials, setCheckedViewMaterials] = useState(permissionone); //replaced automatic falses with actual getPermissions status

  const {permissiontwo} = getPermissions("permissiontwo_submitlateassignments");
  const [isCheckedSubmitAssignments, setCheckedSubmitAssignments] = useState(permissiontwo);

  const {permissionthree} = getPermissions("permissionthree_discussionparticipation");
  const [isCheckedParticipateDiscussions, setCheckedParticipateDiscussions] = useState(permissionthree);

  const {permissionfour} = getPermissions("permissionfour_timelimits");
  const [isCheckedToggleTimeLimits, setCheckedToggleTimeLimits] = useState(permissionfour);

  const {permissionfive} = getPermissions("permissionfive_accessresources");
  const [isCheckedAccessResources, setCheckedAccessResources] = useState(permissionfive);

  const {permissionsix} = getPermissions("permissionsix_receivenotifications");
  const [isCheckedReceiveNotifications, setCheckedReceiveNotifications] = useState(permissionsix);

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
                <li id='program-1'>Program 1</li>
                <li id='program-2'>Program 2</li>
                <li id='program-3'>Program 3</li>
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
                onChange={() => {if(canChange) {setCheckedViewMaterials(!isCheckedViewMaterials);}}}
                disabled={!canChange}
                />
              <ToggleSwitch 
                label="Submit late assignments"
                isChecked={isCheckedSubmitAssignments}
                onChange={() => {if(canChange) {setCheckedSubmitAssignments(!isCheckedSubmitAssignments);}}}
                disabled={!canChange}/>
              <ToggleSwitch 
                label="Participate in public discussions"
                isChecked={isCheckedParticipateDiscussions}
                onChange={() => {if(canChange) {setCheckedParticipateDiscussions(!isCheckedParticipateDiscussions);}}}
                disabled={!canChange}/>
              <ToggleSwitch 
                label="Toggle time limits"
                isChecked={isCheckedToggleTimeLimits}
                onChange={() => {if(canChange) {setCheckedToggleTimeLimits(!isCheckedToggleTimeLimits);}}}
                disabled={!canChange}/>
              <ToggleSwitch 
                label="Access outside resources"
                isChecked={isCheckedAccessResources}
                onChange={() => {if(canChange) {setCheckedAccessResources(!isCheckedAccessResources);}}}
                disabled={!canChange}/>
              <ToggleSwitch 
                label="Receive notifications"
                isChecked={isCheckedReceiveNotifications}
                onChange={() => {if(canChange) {setCheckedReceiveNotifications(!isCheckedReceiveNotifications);}}}
                disabled={!canChange}/>
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