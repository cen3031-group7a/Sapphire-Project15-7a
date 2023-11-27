import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const buttonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  border: '2px solid darkblue',
  margin: '7px', // Add spacing between buttons if needed
};

const lightBlue = {
  background: 'lightblue',
};

const gold = {
  background: 'gold',
};

const darkblue = {
  background: 'darkblue',
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  // minHeight: '100vh',
};

const activityContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid black',
  borderRadius: '40px',
  width: '80%', // Set width to 80% for a cleaner look
};

const columnContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', // Adjust width as needed
  // border: '2px solid black',
  borderRadius: '40px',
  padding: '20px',
};

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className='container nav-padding' style={containerStyle}>
      <NavBar/>
      <div id='activity-container' style={activityContainerStyle}>
        <div id='header'>
          <div>Home Dashboard</div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '20vh'
        }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '6vh',
            color: 'darkblue',
          }}>Welcome to the Student Home Dashboard</h1>
          <div style={columnContainerStyle}>
            <Link to="/myprograms" style={{
              ...buttonStyle,
              ...lightBlue,
              borderRadius: '45px', // Adjust the border radius for pill shape
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
                color: 'darkblue',
                height: '90px',
                borderRadius: '40px', // Adjust the border radius for pill shape
              }}>My Programs</button>
            </Link>
            {/* Repeat the same modifications for the other buttons */}
            <Link to="/parentalcontrols" style={{
              ...buttonStyle,
              ...darkblue,
              borderRadius: '45px',
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
                color: 'white',
                height: '90px',
                borderRadius: '40px',
              }}>Parental Controls</button>
            </Link>
            <Link to="/assignments" style={{
              ...buttonStyle,
              ...lightBlue,
              borderRadius: '45px',
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
                color: 'darkblue',
                height: '90px',
                borderRadius: '40px',
              }}>Classroom</button>
            </Link>
            <Link to="/gallery" style={{
              ...buttonStyle,
              ...darkblue,
              borderRadius: '45px',
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
                color: 'white',
                height: '90px',
                borderRadius: '40px',
              }}>Gallery</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}