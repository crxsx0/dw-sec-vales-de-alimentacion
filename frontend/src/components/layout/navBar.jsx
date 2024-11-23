// src/components/layout/Navbar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button 
          className="btn btn-link"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
        <span className="navbar-brand">Sistema de Vales</span>
      </div>
    </nav>
  );
};

export default Navbar;