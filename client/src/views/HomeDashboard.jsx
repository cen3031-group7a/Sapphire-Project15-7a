import React from 'react';
import { Link } from 'react-router-dom';

const buttonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const pastelYellow = {
  background: '#FFF68F', // Pastel Yellow
};

const pastelGreen = {
  background: '#B0E57C', // Pastel Green
};
const pastelBlue = {
  background: '#A4D9E0', // Pastel Blue
};

const pastePurple = {
  background: '#C9A0DC', // Pastel Blue
};





const HomeDashboard = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '48px',
      }}>Welcome to the Student Homepage</h1>
      <div style={{ flex: 1, display: 'flex' }}>
        <Link to="/dashboard" style={{
          ...buttonStyle,
          ...pastelYellow,
          margin: '20px',
          borderRadius: '20px',
          border: 'black 2px solid'
        }}>
          <button style={{
            width: '100%',
            fontSize: '24px',
            background: 'none',
            border: 'none',
            fontSize: '40px',
          }}>My Programs</button>
        </Link>
        <Link to="/activityLevel" style={{
          ...buttonStyle,
          ...pastelGreen,
          margin: '20px',
          borderRadius: '20px',
          border: 'black 2px solid'
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
      <div style={{ flex: 1, display: 'flex' }}>
        <Link to="/report" style={{
          ...buttonStyle,
          ...pastelBlue,
          margin: '20px',
          borderRadius: '20px',
          border: 'black 2px solid'
        }}>
          <button style={{
            width: '100%',
            fontSize: '24px',
            background: 'none',
            border: 'none',
            fontSize: '40px',
          }}>Classroom</button>
        </Link>
        <Link to="/group-report" style={{
          ...buttonStyle,
          ...pastePurple,
          margin: '20px',
          borderRadius: '20px',
          border: 'black 2px solid'
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
  );
};

export default HomeDashboard;
