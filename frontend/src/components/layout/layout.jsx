// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './sideBar';
import Navbar from './navBar';

const Layout = ({ children, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex vh-100">
      <div className={`sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <Sidebar 
          isCollapsed={isCollapsed} 
          onLogout={onLogout}
          toggleSidebar={toggleSidebar}
        />
      </div>
      
      {/* Overlay para móviles */}
      <div 
        className={`sidebar-overlay ${!isCollapsed ? 'show' : ''}`} 
        onClick={toggleSidebar}
      />

      {/* Contenido principal */}
      <div 
        className="main-content flex-grow-1"
        style={{
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Navbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;