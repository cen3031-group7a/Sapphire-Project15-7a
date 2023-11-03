import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';

const ParentalControls = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform email and password verification logic here.
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div className='page-title'>Parental Controls</div>
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
          <button type='submit' className='submit-button'>Log In</button>
        </form>
        {/* Add your parental controls content here */}
      </div>
    </div>
  );
};

export default ParentalControls;
