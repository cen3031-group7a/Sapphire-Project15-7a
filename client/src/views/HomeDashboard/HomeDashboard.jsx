import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const buttonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '200px',
  minHeight: '300px',
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
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const activityContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid black',
  borderRadius: '40px',
  padding: '20px',
  width: '100%', // Set width to 100% to take up the entire screen width
  maxWidth: '800px',
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
        }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '48px',
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
              }}>Gallery</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
