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
import Dashboard from './pages/dashboard/dashBoard';
import Settings from './pages/settings/settings';
import Layout from './components/layout/layout';

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
      <Routes>
        <Route 
          path="/" 
          element={<Login onLogin={handleLogin} />} 
        />
        // En tu main.jsx, asegúrate de que la ruta raíz redirija al login
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
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

// Renderizado de la aplicación
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);