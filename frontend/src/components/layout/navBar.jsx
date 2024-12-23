// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar, isCollapsed }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Función para actualizar la hora
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Obtiene la hora y minutos en formato local
      setTime(formattedTime);
    };

    updateTime(); // Llama a la función al cargar el componente
    const timer = setInterval(updateTime, 1000); // Actualiza la hora cada segundo

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
         style={{
           marginLeft: isCollapsed ? '70px' : '260px',
           width: `calc(100% - ${isCollapsed ? '70px' : '260px'})`,
           position: 'fixed',
           top: 0,
           right: 0,
           zIndex: 1000,
           transition: 'all 0.3s ease'
         }}>
      <div className="container-fluid">
      
        <span className="navbar-brand mb-0 h1 ms-2"></span>

        <div className="ms-auto d-flex align-items-center">
          {/* Reloj dinámico */}
          <div className="text-muted me-3">
            <FontAwesomeIcon icon={faClock} />
            <span className="ms-2">{time}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
