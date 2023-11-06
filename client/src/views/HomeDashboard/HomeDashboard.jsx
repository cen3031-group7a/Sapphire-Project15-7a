import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const buttonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '200px', // Set a minimum width for the buttons
  minHeight: '250px', // Set a minimum height for the buttons
  border: '2px solid darkblue',
  color: 'darkblue',
};

const lightBlue = {
  background: 'lightblue', // Light Blue
};

const gold = {
  background: 'gold', // Gold
};

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className='container nav-padding' style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <NavBar />
      <div id='activity-container' style={{
        border: '2px solid black', // Add a border around the activity container
        borderRadius: '20px', // Rounded corners
        padding: '20px', // Add padding to the container
        width: '80%', // Adjust the width as needed
        maxWidth: '800px', // Set a maximum width if necessary
      }}>
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
