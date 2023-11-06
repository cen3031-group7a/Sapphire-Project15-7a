import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './Gallery.less';

const Gallery = () => {
  const projectsData = [
    { id: 1, name: 'Sample Project 1', category: 'My Projects' },
    { id: 2, name: 'Sample Project 2', category: 'Shared Projects' },
    { id: 3, name: 'Sample Project 3', category: 'Saved Projects' },
    // Add more project objects as needed
  ];

  const [projects, setProjects] = useState(projectsData);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === 'All' || project.category === categoryFilter)
    );
  });

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="activity-container">
        <div id="header">
          <div>Gallery Page</div>
        </div>
        <div>
          {/* Category selection buttons */}
          <div className="centered-buttons">
            <button
              onClick={() => setCategoryFilter('All')}
              className={categoryFilter === 'All' ? 'active' : ''}
            >
              All
            </button>
            <button
              onClick={() => setCategoryFilter('My Projects')}
              className={categoryFilter === 'My Projects' ? 'active' : ''}
            >
              My Projects
            </button>
            <button
              onClick={() => setCategoryFilter('Shared Projects')}
              className={categoryFilter === 'Shared Projects' ? 'active' : ''}
            >
              Shared Projects
            </button>
            <button
              onClick={() => setCategoryFilter('Saved Projects')}
              className={categoryFilter === 'Saved Projects' ? 'active' : ''}
            >
              Saved Projects
            </button>
          </div>
          {/* Search input */}
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div id="project-gallery">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-item">
              <img
                src={`/thumbnails/${project.id}.jpg`}
                alt={project.name}
              />
              <div className="project-name">{project.name}</div>
              <div className="project-category">{project.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
