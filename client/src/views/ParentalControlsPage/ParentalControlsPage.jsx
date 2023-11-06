import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

export default function ParentalControlsPage() {
  const listStyle = {
    textAlign: 'left',
    padding: '5px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '40px',
    borderRadius: '5px',
  };  

  const columnStyle = {
    flex: 1, 
    margin: '10px', 
    padding: '10px', 
    border: '3px solid #3b719f',
    borderRadius: '10px',
  };  

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
            <h2>Student Grades</h2>
              {/* Add student grades content here */}
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
              <li>Recieve notifications</li>
            </ul>
            <div id='add-button' className="centered-buttons" style={{alignItems: 'center'}}>
              <button onClick={handleClick}>Edit Permissions</button> 
              {/*when clicked will take to restrictions page where there can be various on/off switches for different permissions*/}
            </div>
          </div>
        </div>
        </div>
    </div>      
  );
  };