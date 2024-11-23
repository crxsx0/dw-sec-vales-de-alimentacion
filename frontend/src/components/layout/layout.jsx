import React, { useState } from 'react';
import Navbar from './navBar';
import Sidebar from './sideBar ';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="d-flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-grow-1 p-4 ${sidebarOpen ? 'margin-left-240' : 'margin-left-80'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;