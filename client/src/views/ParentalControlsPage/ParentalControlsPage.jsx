import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import GradesComponent from '../Grades/Grades';

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
  };  

  const columnStyle = {
    flex: 1, 
    margin: '10px', 
    padding: '10px', 
    border: '3px solid #3b719f',
    borderRadius: '10px',
    backgroundColor: 'rgba(61, 159, 230, 0.45)',
  };  

  const buttonStyle = {
    display: 'flex', 
    justifyContent: 'center',
    marginRight: '30px',
  }

  const handleClick = (e) => {
    //e.preventDefault;
    //navigate('/restrictions');
  }

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
          <div style={columnStyle}>
            <div id='grades-programs-container'> 
            </div>
          </div>

          {/* Student Permissions Section */}
          <div style={columnStyle}>
            <h2>Student Permissions</h2>
            <ul>
              <li>View course materials</li>
              <li>Submit late assignments</li>
              <li>Participate in public discussions</li>
              <li>Toggle time limits</li>
              <li>Access outside resources</li>
              <li>Receive notifications</li>
            </ul>
            <div id='add-button' style={buttonStyle}>
              <button onClick={handleClick}>Edit Permissions</button> 
              {/*when clicked will take to restrictions page where there can be various on/off switches for different permissions*/}
            </div>
          </div>
        </div>
        </div>
    </div>      
  );
  };