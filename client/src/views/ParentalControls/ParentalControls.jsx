import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import './ParentalControls.less'; 

const ParentalControls = () => {
  //possibly change this to parentalcontrollogin to differentiate from the actual page with the controls
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //this page will take in a parents email and password and give them access to a dashboard, where they can enable permissions, see performance, and programs. 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/parentalcontrolspage');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div className='page-title'>Parental Controls Login</div>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='center-button'>
            <div style={{
                display: 'flex',
                width: '26vw',
                justifyContent: 'space-between'
              }}>
              <button type='submit' className='submit-button'>Log In</button>
              <button type='button' className='submit-button'>Forgot Password?</button>
            </div>
          </div>
          <div className='center-button'>
          <button type='button' className='submit-button'>Create Account</button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default ParentalControls;
