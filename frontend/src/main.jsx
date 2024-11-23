import React, { useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faUtensils, 
  faCheckCircle, 
  faClock, 
  faDollarSign,
  faHome,
  faReceipt,
  faHistory,
  faCalendar,
  faCog,
  faSignOutAlt,
  faUser,
  faPrint,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/login';
import Dashboard from './pages/dashBoard';
import Settings from './pages/settings';

// Agregar los íconos a la biblioteca de Font Awesome
library.add(
  faUtensils, 
  faCheckCircle, 
  faClock, 
  faDollarSign,
  faHome,
  faReceipt,
  faHistory,
  faCalendar,
  faCog,
  faSignOutAlt,
  faUser,
  faPrint,
  faBars
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Login 
              onLogin={() => setIsAuthenticated(true)} 
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard 
                onLogout={() => setIsAuthenticated(false)} 
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/settings" 
          element={
            isAuthenticated ? (
              <Settings 
                isAuthenticated={isAuthenticated}
                onLogout={() => setIsAuthenticated(false)}
              />
            ) : (
              <Navigate to="/" replace />
            )
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

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);