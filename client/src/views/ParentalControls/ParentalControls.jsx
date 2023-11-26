import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import './ParentalControls.less';
import { getStudent, getParent, getParents, postParents } from '../../Utils/requests';
import { message } from 'antd';

const CreateAccountModal = ({ closeModal, handleCreateAccount, currentStudent }) => {
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
    handleCreateAccount(newName, newEmail, newPassword, currentStudent);
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
  const [currentStudent, setCurrentStudent] = useState('');

  useEffect(() => {
    getParents().then((res) => {
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

  const studentId = localStorage.getItem('student')

  useEffect(() => {
    // Fetch the current student information here and update the state
    getStudent().then((res) => {
      if (res.data) {
        setCurrentStudent(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, []);

  const handleCreateAccount = async (newName, newEmail, newPassword, currentStudent) => {
    try {
      // Make a POST request to the Strapi API endpoint for creating a new user
      const { data } = await postParents(newName, newEmail, newPassword, currentStudent);
      // Log success message
      message.log('Account created successfully');
      // Redirect to the new user's sandbox
      history.push(`/sandbox/${data.id}`);
      
      // Optionally, you can do something after successfully creating the account
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made, but the server responded with an error status code
        message.error('Failed to create account:', error.response.data.message);
      } else if (error.request) {
        // The request was made, but no response was received
        message.error('No response received. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Account created successfully');
      }
    }
  };

  const handleLogin = async () => {
    parentList.forEach((elem) => {
      if(elem['email'] == email) {
        const parent = getParent(elem['id']);
        getParent(elem['id']).then((res) => {
          if(res.data) {
            // This doesn't work because Strapi doesn't include passwords in API responses.
            // We have to do proper user authentication or rename the password field
            // See https://strapi.io/blog/strapi-authentication-with-react 
            if(res['password'] == password) {
              // TODO: Set parent data in user session var
              navigate('/parentalcontrolspage');
            }
            else {
              message.error('Incorrect password.');
              return;
            }
          } else {
            message.error(res.err);
            return;
          }
        })
      }
    });
    message.error('No account with that email found.');
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

        <div>
          <b>Parent List: </b>
          {JSON.stringify(parentList)}
        </div>

        <div>
          <b>Current Student: </b>
          {JSON.stringify(currentStudent)}
        </div>

      </div>
      

      {isModalOpen && (
        <CreateAccountModal closeModal={closeModal} handleCreateAccount={handleCreateAccount} />
      )}
    </div>
  );
};

export default ParentalControls;