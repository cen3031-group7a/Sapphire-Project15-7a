import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const buttonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '14vh',
  height: '28vh',
  border: '2px solid darkblue',
  color: 'darkblue',
};

const lightBlue = {
  background: 'lightblue',
};

const gold = {
  background: 'gold',
};

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
  width: '80%', // Set width to 80% for cleaner look
};

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className='container nav-padding' style={containerStyle}>
      <NavBar />
      <div id='activity-container' style={activityContainerStyle}>
        <div id='header'>
          <div>Dashboard</div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '20vh'
        }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '6vh',
          }}>Welcome to the Student Homepage</h1>
          <div style={{ display: 'flex' }}>
            <Link to="/myprograms" style={{
              ...buttonStyle,
              ...lightBlue,
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
              }}>My Programs</button>
            </Link>
            <Link to="/parentalcontrols" style={{
              ...buttonStyle,
              ...gold,
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
              }}>Parental Controls</button>
            </Link>
          </div>
          <div style={{ display: 'flex' }}>
            <Link to="/assignments" style={{
              ...buttonStyle,
              ...gold,
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
              }}>Classroom</button>
            </Link>
            <Link to="/gallery" style={{
              ...buttonStyle,
              ...lightBlue,
            }}>
              <button style={{
                width: '100%',
                fontSize: '24px',
                background: 'none',
                border: 'none',
                fontSize: '40px',
                cursor: 'pointer',
              }}>Gallery</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
