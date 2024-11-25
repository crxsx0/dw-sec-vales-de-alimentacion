// src/context/DashboardContext.jsx
import React, { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState({
    valesEmitidosHoy: 0,
    valesUtilizadosHoy: 0,
    empleadosActivos: 0,
    valesNoUtilizados: 0
  });

  const updateStats = (newStats) => {
    setDashboardStats(prev => ({
      ...prev,
      ...newStats
    }));
  };

  return (
    <DashboardContext.Provider value={{ dashboardStats, updateStats }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);