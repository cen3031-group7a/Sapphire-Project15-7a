import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import './MyPrograms.less';

const MyPrograms = () => {
  const [menuVisible, setMenuVisible] = React.useState(null);

  const toggleMenu = (programId) => {
    setMenuVisible(menuVisible === programId ? null : programId);
  };

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

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>My Programs</div>
        </div>
        <div id='add-button'>
          <button>Create New</button>
        </div>
        <div id='program-list'>
          <ul>
            {programs.map((program) => (
              <div className="program-container" key={program.id}>
                <Link className='link' to={`/sandbox`}>
                  <li>
                    {program.name}
                  </li>
                </Link>
                <div className="dots-container">
                  <div className="dots" onClick={() => toggleMenu(program.id)}>
                    •••
                    {menuVisible === program.id && (
                      <div className="menu">
                        <h1>Actions for {program.name}:</h1>
                        <ul>
                          <li>Edit</li>
                          <li>Share</li>
                          <li>Delete</li>
                        </ul>
                      </div>
                    )}
                    {menuVisible === program.id && (
                      <div className="backdrop" onClick={() => setMenuVisible(null)}></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPrograms;
