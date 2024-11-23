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
    <div className="d-flex min-vh-100">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onLogout={onLogout}
        toggleSidebar={toggleSidebar}
      />
      <div 
        className="flex-grow-1"
        style={{
          marginLeft: isCollapsed ? '70px' : '260px',
          transition: 'margin-left 0.3s ease',
          width: '100%'
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