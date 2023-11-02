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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to the Student Homepage</h1>
      <div style={{ flex: 1, display: 'flex' }}>
        <Link to="/dashboard" style={{ ...buttonStyle, ...pastelYellow }}>
          <button style={{ width: '100%', fontSize: '24px' }}>My Programs</button>
        </Link>
        <Link to="/activityLevel" style={{ ...buttonStyle, ...pastelGreen }}>
          <button style={{ width: '100%', fontSize: '24px' }}>Parental Controls</button>
        </Link>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <Link to="/report" style={{ ...buttonStyle, ...pastelBlue }}>
          <button style={{ width: '100%', fontSize: '24px' }}>Classroom</button>
        </Link>
        <Link to="/group-report" style={{ ...buttonStyle, ...pastePurple }}>
          <button style={{ width: '100%', fontSize: '24px' }}>Gallery</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeDashboard;
