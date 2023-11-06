import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

const MyPrograms= () => {
    const buttonStyle = {
        color: 'Black',
        margin: '30px',
        textAlign: 'left',
        padding: '10px',
        borderRadius: '5px',
      };
    const listStyle = {
        textAlign: 'left',
        padding: '10px',
        marginLeft: '50px',
        marginBottom: '50px',
        borderRadius: '5px',
      };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>My Programs</div>
        </div>
        <div id='add-button' style={buttonStyle}>
            <button>Create New</button>
        </div>
        <div id='program-list' style={listStyle}>
            <ul>
                <li id='program-1'>Program 1</li>
                <li id='program-2'>Program 2</li>
                <li id='program-3'>Program 3</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPrograms;