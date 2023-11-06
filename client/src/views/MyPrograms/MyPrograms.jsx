import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './MyPrograms.less';

const MyPrograms = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState(null);

  const toggleMenu = (programId) => {
    setMenuVisible(!menuVisible);
    setSelectedProgram(programId);
  };

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
            <li id='program-1'>
              Program 1
              <div className="dots" onClick={() => toggleMenu('program-1')}>
                •••
                {menuVisible && selectedProgram == 'program-1' && (
                  <div className="menu">
                    <ul>
                      <li>Edit</li>
                      <li>Share</li>
                      <li>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li id='program-2'>
              Program 2
              <div className="dots" onClick={() => toggleMenu('program-2')}>
                •••
                {menuVisible && selectedProgram == 'program-2' && (
                  <div className="menu">
                    <ul>
                      <li>Edit</li>
                      <li>Share</li>
                      <li>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li id='program-3'>
              Program 3
              <div className="dots" onClick={() => toggleMenu('program-3')}>
                •••
                {menuVisible && selectedProgram == 'program-3' && (
                  <div className="menu">
                    <ul>
                      <li>Edit</li>
                      <li>Share</li>
                      <li>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li id='program-4'>
              Program 4
              <div className="dots" onClick={() => toggleMenu('program-4')}>
                •••
                {menuVisible && selectedProgram == 'program-4' && (
                  <div className="menu">
                    <ul>
                      <li>Edit</li>
                      <li>Share</li>
                      <li>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li id='program-5'>
              Program 5
              <div className="dots" onClick={() => toggleMenu('program-5')}>
                •••
                {menuVisible && selectedProgram == 'program-5' && (
                  <div className="menu">
                    <ul>
                      <li>Edit</li>
                      <li>Share</li>
                      <li>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};

export default MyPrograms;