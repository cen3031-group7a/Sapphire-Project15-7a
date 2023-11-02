import React from 'react';
import { Link } from 'react-router-dom';

const HomeDashboard = () => {
  return (
    <div>
      <h1>Welcome to the Student Homepage</h1>
      <div>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/activityLevel">
          <button>Activity Level Report</button>
        </Link>
        <Link to="/report">
          <button>Report</button>
        </Link>
        <Link to="/group-report">
          <button>Group Report</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeDashboard;
