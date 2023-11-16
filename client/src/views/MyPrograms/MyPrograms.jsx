import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useParams } from 'react-router-dom';
import './MyPrograms.less';
import { getPrograms, postProgram, deleteProgram } from '../../Utils/requests';

const MyPrograms = ({ history }) => {
  const [programs, setPrograms] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newProgramTitle, setNewProgramTitle] = useState('');
  const { sandboxRoute } = useParams(); // If you're receiving the route as a param

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, err } = await getPrograms();
      if (!err) {
        setPrograms(data);
      } else {
        console.error('Error fetching programs:', err);
      }
    };

    fetchPrograms();
  }, []);

  const toggleMenu = (programId) => {
    setMenuVisible(menuVisible === programId ? null : programId);
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
  };

  const handleCreateProgram = async () => {
    const { data, err } = await postProgram(newProgramTitle);
    console.log(data);
    if (!err) {
      setPrograms([...programs, data]); // Update state with the newly created program
      setIsCreatingNew(false);
      setNewProgramTitle('');
      // Optionally, you may want to navigate to the newly created program's route
      history.push(`/sandbox/${data.id}`);
    } else {
      console.error('Error creating program:', err);
    }
  };

  const handleEdit = () => {
    // Perform any necessary actions to edit the program
    alert('TODO: Edit');
  };

  const handleShare = () => {
    // Perform any necessary actions to share the program
    alert('TODO: Share');
  };

  const handleDelete = async (id) => {
    // Perform any necessary actions to delete the program
    const { err } = await deleteProgram(id);
    if (!err) {
      const updatedPrograms = programs.filter((program) => program.id !== id);
      setPrograms(updatedPrograms);
    } else {
      console.error('Error deleting program:', err);
    }
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
                    value={newProgramTitle}
                    onChange={(e) => setNewProgramTitle(e.target.value)}
                  />
                  <button onClick={() => handleCreateProgram()} className='create-button'>Create</button>
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
                  <li>{program.title}</li>
                </Link>
                <div className='dots-container'>
                  <div className='dots' onClick={() => toggleMenu(program.id)}>
                    •••
                    {menuVisible === program.id && (
                      <div className='menu'>
                        <h1>Actions for {program.title}:</h1>
                        <ul>
                          <li onClick={handleEdit}>Edit</li>
                          <li onClick={handleShare}>Share</li>
                          <li onClick={() => handleDelete(program.id)}>Delete</li>
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
