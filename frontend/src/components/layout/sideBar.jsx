// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`sidebar bg-light ${isCollapsed ? 'width-80' : 'width-240'}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon="home" />
            {!isCollapsed && <span className="ms-2">Dashboard</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <FontAwesomeIcon icon="cog" />
            {!isCollapsed && <span className="ms-2">Settings</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;