// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faTicketAlt, 
  faUsers, 
  faCog, 
  faSignOutAlt,
  faUtensils,
  faChartBar,
  faPrint,
  faUserCog,
  faChevronLeft,  // Añade este icono
  faChevronRight  // Y este icono
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isCollapsed, onLogout, toggleSidebar }) => { // Añade toggleSidebar como prop
  const navigate = useNavigate();
  const location = useLocation();


    // ... resto de los items del menú ...
 const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard', // Cambiado de '/' a '/dashboard'
      icon: faHome
    },
    {
      title: 'Emisión de Vales',
      path: '/emision-vales',
      icon: faPrint
    },
    {
      title: 'Servicios',
      path: '/servicios',
      icon: faUtensils
    },
    {
      title: 'Usuarios',
      path: '/usuarios',
      icon: faUsers
    },
    {
      title: 'Reportes',
      path: '/reportes',
      icon: faChartBar
    },
    {
      title: 'Configuración',
      path: '/settings',  // Actualizado para coincidir con tu ruta actual
      icon: faCog
    }
  ];



  return (
    <div 
      className={`sidebar bg-white shadow-sm ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        width: isCollapsed ? '70px' : '260px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        transition: 'width 0.3s ease',
        zIndex: 1000,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div className="d-flex flex-column h-100">
        {/* Logo y botón de colapso */}
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          {!isCollapsed && (
            <h5 className="m-0">Sistema de Vales</h5>
          )}
          <button
            className="btn btn-link p-0 text-dark border-0"
            onClick={toggleSidebar}
            style={{
              marginLeft: isCollapsed ? 'auto' : '0',
              marginRight: isCollapsed ? 'auto' : '0'
            }}
          >
            <FontAwesomeIcon 
              icon={isCollapsed ? faChevronRight : faChevronLeft} 
              className="fs-5"
            />
          </button>
        </div>

        {/* Resto del contenido del Sidebar */}
        <div className="flex-grow-1">
          <ul className="nav flex-column p-2">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center py-3 ${
                    location.pathname === item.path ? 'active text-primary' : 'text-dark'
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className={isCollapsed ? 'mx-auto' : 'me-2'} 
                  />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de usuario */}
        <div className="border-top p-3">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                 style={{ width: '40px', height: '40px' }}>
              <span>Y</span>
            </div>
            {!isCollapsed && (
              <div className="ms-3">
                <div className="fw-bold">Admin1</div>
                <small className="text-muted">Administrador</small>
              </div>
            )}
          </div>
          
          <button
            onClick={onLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isCollapsed && <span className="ms-2">Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;