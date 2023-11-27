import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getSaved } from '../../Utils/requests';
import { useNavigate } from 'react-router-dom';
import{ getStudentMe } from '../../Utils/requests';
import './Gallery.less';

const Gallery = () => {
  const [saves, setSaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getStudentMe();
        const studentID = s.data.students[0].id;
        console.log(studentID);
    
        // NEED TO ADD LOGIC WHERE STUDENT ID MATCHES ID IN SAVED.
    
        const savesRes = await getSaved();
        const idOfStudentLoggedin = savesRes.data[0].student.id;
    
        if (studentID === idOfStudentLoggedin && savesRes.data) {
          try {
            setSaves(savesRes.data);
            console.log('savesRes1:', savesRes.data);
          } catch (error) {
            console.error(savesRes.error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleShare = (activity) => {
    console.log('Sharing:', activity);
  };
const handleFilterChange = (filter) => {
  setActiveFilter(filter);
};
  const filteredSaves = saves.filter((save) =>
    save.activity.StandardS.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaves = (activity) => {
    console.log('Name: ', activity);
    activity.lesson_module_name = saves.activity;  
    localStorage.setItem('my-activity', JSON.stringify(activity));
    navigate('/workspace');
  };


  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="activity-container">
        <div id="header">
          <div>Gallery Page</div>
        </div>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div id="project-gallery">
          {filteredSaves.length > 0 ? (
            filteredSaves.map((save) => (
              <div key={save.activity.id} className="project-item">
                <div className="project-name">{`${save.activity.StandardS}: ${save.activity.number}`}</div>
                <div className="project-category">Past Program</div>
                <div className="button-group">
                  <button className="share-button" onClick={() => handleShare(save.activity)}>
                    Share
                  </button>
                  <button className="navigate-button" onClick={() => handleSaves(save.activity)}>
                    Navigate to Workspace
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>You have no past programs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 

export default Gallery;
