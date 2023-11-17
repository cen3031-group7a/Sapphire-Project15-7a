import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import './ParentalControls.less';
import { getParents, postParents } from '../../Utils/requests';

const CreateAccountModal = ({ closeModal, handleCreateAccount }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleCreate = () => {
    // Add any validation logic here before calling the create parent function
    handleCreateAccount(newName, newEmail, newPassword);
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" id="name" value={newName} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" id="email" value={newEmail} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" id="password" value={newPassword} onChange={handlePasswordChange} required />
        </div>
        <button onClick={handleCreate}>Create Account</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

const ParentalControls = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentList, setParentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getParents().then((res) => {
      if (res.data) {
        setParentList(res.data);
      } else {
        //message.error(res.err);
      }
    });
  }, []); // <-- empty dependency array to run only once

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAccount = async (newName, newEmail, newPassword) => {
    try {
      // Make a POST request to the Strapi API endpoint for creating a new user
      const { data, err } = await postParents(newName, newEmail, newPassword);
      console.log(data);
      // Check if the request was successful (status code 2xx)
      if (!err) {
        console.log('Account created successfully');
        history.push(`/sandbox/${data.id}`);
        // Optionally, you can do something after successfully creating the account
      } else {
        // Handle the case when the request was not successful (status code is not 2xx)
        console.error('Failed to create account:', err);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error creating account:', error.message);
    }
  };

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="activity-container">
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
          </form>
        <div className="center-button">
          <button type="button" className="submit-button" onClick={openModal}>
            Create Account
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CreateAccountModal closeModal={closeModal} handleCreateAccount={handleCreateAccount} />
      )}
    </div>
  );
};

export default ParentalControls;