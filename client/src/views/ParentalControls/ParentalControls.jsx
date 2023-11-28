import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import './ParentalControls.less';
import { getParent, getParents, postParents, getStudentMe, postRegisterParent, getUser, forgetPassword } from '../../Utils/requests';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { message } from 'antd';

const CreateAccountModal = ({ closeModal, handleCreateAccount, handleCreateParent }) => {
  const [newName, setNewName] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setNewLastname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleCreate = () => {
    handleCreateAccount(newUsername, newEmail, newPassword);
    handleCreateParent(newName, newLastname);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Account</h2>
        <div className="form-group">
          <input type="create" placeholder="Name" style={{ marginBottom: '5%', width: '95%' }} value={newName} onChange={handleNameChange} required />
        </div>
        <div className="form-group">  
          <input type="create" placeholder="Lastname" style={{ marginBottom: '5%', width: '95%' }} value={newLastname} onChange={handleLastnameChange} required />
        </div>
        <div className="form-group">
          <input type="create" placeholder="Username" style={{ marginBottom: '5%', width: '95%' }} value={newUsername} onChange={handleUsernameChange} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" style={{ marginRight: '10%', width: '90%' }} value={newEmail} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" style={{ marginRight: '10%', width: '90%' }} value={newPassword} onChange={handlePasswordChange} required />
        </div>
        <button type='button' onClick={handleCreate}>Create Account</button>
        <button style={{ marginTop: '5%'}} onClick={closeModal}>Cancel</button>

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
  const [currentStudent, setCurrentStudent] = useState('');

  useEffect(() => {
    getUser().then((res) => {
      if (res.data) {
        setParentList(res.data);
      } else {
        message.error(res.err);
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
    handleLogin();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch the current student information here and update the state
    getStudentMe().then((res) => {
      if (res.data) {
        setCurrentStudent(res.data.students[0].name);
      } else {
        message.error(res.err);
      }
    });
  }, []);

  const handleCreateAccount = async (newUsername, newEmail, newPassword) => {
    try {
      // Make a POST request to the Strapi API endpoint for creating a new user
      const { data, error } = await postRegisterParent(newUsername, newEmail, newPassword);
      // Log success message
      message.log('Account created successfully');
      // Redirect to the new user's sandbox
      history.push(`/sandbox/${data.id}`);
      
      // Optionally, you can do something after successfully creating the account
    } catch (error) {
      // Handle errors
      if (!error) {
        message.error('Failed to create account.');
      } else {
        console.log('Account created successfully');
      }
    }
  };

  const handleCreateParent = async (newName, newLastname) => {
    try {
      // Make a POST request to the Strapi API endpoint for creating a new user
      const { data, error } = await postParents(newName, newLastname);
      // Log success message
      message.log('Parent account created successfully');
      // Redirect to the new user's sandbox
      history.push(`/sandbox/${data.id}`);
      
      // Optionally, you can do something after successfully creating the account
    } catch (error) {
      // Handle errors
      if (!error) {
        message.error('Failed to create account.');
      } else {
        console.log('Parent account created successfully');
      }
    }
  };

  const handleLogin = async () => {
    let body = { identifier: email, password: password };

    postUser(body)
      .then((response) => {
        if (response.data.user.role.name === 'Parent') {
          setUserSession(response.data.jwt, JSON.stringify(response.data.user));
          navigate('/parentalcontrolspage');
          console.log(JSON.stringify(response.data.user));
        } else {
          message.error('User is not a parent');
        }
      })
      .catch((error) => {
        message.error('Login failed. Please input a valid email and password.');
      });
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
              style={{marginLeft:'4%'}}
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
                width: '25vw',
                justifyContent: 'space-between'
              }}>
              <button type='submit' className='submit-button'>Log In</button>
              <button type='button' className='submit-button' onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
            </div>
          </div>
          </form>
        <div className="center-button">
          <button type="button" className="submit-button" onClick={openModal}>
            Create Account
          </button>
        </div>

        {/* { <div>
          <b>Parent List: </b>
          {JSON.stringify(parentList)}
        </div>

          <div>
            <b>Current Student: </b>
            {JSON.stringify(currentStudent)}
          </div> } */}

      </div>
      

      {isModalOpen && (
        <CreateAccountModal closeModal={closeModal} handleCreateAccount={handleCreateAccount} handleCreateParent={handleCreateParent} />
      )}
    </div>
  );
};

export default ParentalControls;