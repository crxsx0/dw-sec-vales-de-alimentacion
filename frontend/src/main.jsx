// src/main.jsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global.css';


// Configuración
import { setupFontAwesome } from './utils/fontawesome';

// Componentes
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard//dashBoard';
import Settings from './pages/settings/settings';
import EmisionVales from './pages/emisionvales/EmisionVales';
import Layout from './components/layout/layout';
import GestionVales from './pages/gestionvales/GestionVales';
import Servicios from './pages/servicios/servicios';
import ReportesVales from './pages/reportes/ReportesVales';
import Usuarios from './pages/usuarios/Usuarios';
import { DashboardProvider, useDashboard } from './context/DashboardContext';

// Inicializar FontAwesome
setupFontAwesome();

// Componente para rutas protegidas con Layout
const ProtectedRoute = ({ children, isAuthenticated, onLogout }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout onLogout={onLogout}>
      {children}
    </Layout>
  );
};

// Componente principal
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <DashboardProvider>
        <Routes>
        <Route 
          path="/" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <Dashboard 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <Settings 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/emision-vales" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <EmisionVales 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
        path="/gestion-vales" 
        element={
        <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
          <GestionVales />
          </ProtectedRoute>
          } 
          />
          <Route 
          path="/servicios" 
          element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
            <Servicios />
            </ProtectedRoute>
          } 
          />
          <Route 
          path="/servicios" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <Servicios />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reportes" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <ReportesVales />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <Usuarios />
            </ProtectedRoute>
          } 
        />
        </Routes>
      </DashboardProvider>
    </BrowserRouter>
  );
};

// Renderizado de la aplicación
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);