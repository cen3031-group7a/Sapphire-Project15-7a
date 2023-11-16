import React, { useState, useRef } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useParams } from 'react-router-dom';
import './MyPrograms.less';

const MyPrograms = ({ history }) => {
  const [menuVisible, setMenuVisible] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newProgramName, setNewProgramName] = useState('');
  const { sandboxRoute } = useParams(); // If you're receiving the route as a param

  const programs = [
    { id: 'program-1', name: 'Program 1' },
    { id: 'program-2', name: 'Program 2' },
    { id: 'program-3', name: 'Program 3' },
    { id: 'program-4', name: 'Program 4' },
    { id: 'program-5', name: 'Program 5' },
    { id: 'program-6', name: 'Program 6' },
    { id: 'program-7', name: 'Program 7' },
    { id: 'program-8', name: 'Program 8' },
  ];

  const toggleMenu = (programId) => {
    setMenuVisible(menuVisible === programId ? null : programId);
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
  };

  const handleCreateProgram = () => {
    const newProgram = {
      id: `program-${programs.length + 1}`,
      name: newProgramName,
    };

    const updatedPrograms = [...programs, newProgram];

    setIsCreatingNew(false);
    setNewProgramName('');
    // Update programs state or perform any necessary actions with the new program data

    history.push(`/sandbox/`); // Navigate to the sandbox route
  };

  const handleEdit = () => {
    // Perform any necessary actions to edit the program
    alert('TODO: Edit');
  };

  const handleShare = () => {
    // Perform any necessary actions to share the program
    alert('TODO: Share');
  };

  const handleDelete = () => {
    // Perform any necessary actions to delete the program
    alert('TODO: Delete');
  };

  const buttonRef = useRef(null);

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>My Programs</div>
        </div>
        <div id='add-button'>
          <button ref={buttonRef} onClick={handleCreateNew}>Create New</button>
          {
            isCreatingNew && (
              <div className='popup' style={{ top: buttonRef.current.offsetTop, left: buttonRef.current.offsetLeft + buttonRef.current.offsetWidth + 10 }}>
                <div className='popup-inner'>
                  <h2>Create New Project</h2>
                  <label htmlFor='projectName'>Project Name:</label>
                  <input
                    id='projectName'
                    type='text'
                    placeholder='Enter project name'
                    value={newProgramName}
                    onChange={(e) => setNewProgramName(e.target.value)}
                  />
                  <button onClick={handleCreateProgram} className='create-button'>Create</button>
                  <button onClick={() => setIsCreatingNew(false)} className='cancel-button'>Cancel</button>
                </div>
              </div>
            )
          }
        </div >
        <div id='program-list'>
          <ul>
            {programs.map((program) => (
              <div className='program-container' key={program.id}>
                <Link className='link' to={'/sandbox'}>
                  <li>{program.name}</li>
                </Link>
                <div className='dots-container'>
                  <div className='dots' onClick={() => toggleMenu(program.id)}>
                    •••
                    {menuVisible === program.id && (
                      <div className='menu'>
                        <h1>Actions for {program.name}:</h1>
                        <ul>
                          <li onClick={handleEdit}>Edit</li>
                          <li onClick={handleShare}>Share</li>
                          <li onClick={handleDelete}>Delete</li>
                        </ul>
                      </div>
                    )}
                    {menuVisible === program.id && (
                      <div className='backdrop' onClick={() => setMenuVisible(null)}></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
};

export default MyPrograms;
