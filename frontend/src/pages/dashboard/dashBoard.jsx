// src/pages/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/navBar';
import Sidebar from '../../components/layout/sideBar';
import StatsCard from '../../components/ui/cards/StatsCard';

const Dashboard = ({ onLogout, isAuthenticated }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const statsData = [
    {
      icon: "receipt",
      title: "Vales Emitidos",
      value: "1,234",
      text: "Este mes",
      color: "green"
    },
    {
      icon: "clock",
      title: "Vales Pendientes",
      value: "56",
      text: "Por procesar",
      color: "blue"
    },
    {
      icon: "dollar-sign",
      title: "Total en Vales",
      value: "$45,678",
      text: "Valor total",
      color: "purple"
    },
    {
      icon: "check-circle",
      title: "Vales Completados",
      value: "789",
      text: "Este mes",
      color: "orange"
    }
  ];

  return (
    <div className="dashboard-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      <main className={`dashboard-main ${isSidebarCollapsed ? 'margin-left-80' : 'margin-left-240'}`}>
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Bienvenido al panel de control</p>
          </div>

          <div className="dashboard-grid">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                text={stat.text}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;