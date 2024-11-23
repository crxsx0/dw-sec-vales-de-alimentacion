// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'home',
      path: '/dashboard'
    },
    {
      title: 'Gestión de Vales',
      icon: 'ticket',
      path: '/vales',
      submenu: [
        { title: 'Crear Vale', path: '/vales/create', icon: 'plus' },
        { title: 'Lista de Vales', path: '/vales/list', icon: 'list' },
        { title: 'Historial', path: '/vales/history', icon: 'history' }
      ]
    },
    {
      title: 'Beneficiarios',
      icon: 'users',
      path: '/beneficiaries',
      submenu: [
        { title: 'Registro', path: '/beneficiaries/register', icon: 'user-plus' },
        { title: 'Lista', path: '/beneficiaries/list', icon: 'address-book' },
        { title: 'Asignaciones', path: '/beneficiaries/assignments', icon: 'tasks' }
      ]
    },
    {
      title: 'Comercios',
      icon: 'store',
      path: '/commerce',
      submenu: [
        { title: 'Registrar Comercio', path: '/commerce/register', icon: 'plus-square' },
        { title: 'Comercios Afiliados', path: '/commerce/list', icon: 'building' },
        { title: 'Transacciones', path: '/commerce/transactions', icon: 'exchange-alt' }
      ]
    },
    {
      title: 'Reportes',
      icon: 'chart-bar',
      path: '/reports',
      submenu: [
        { title: 'Estadísticas', path: '/reports/stats', icon: 'chart-line' },
        { title: 'Informes Mensuales', path: '/reports/monthly', icon: 'calendar-alt' },
        { title: 'Auditoría', path: '/reports/audit', icon: 'file-alt' }
      ]
    },
    {
      title: 'Settings',
      icon: 'cog',
      path: '/settings'
    }
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar bg-light ${isCollapsed ? 'collapsed' : ''}`}>
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <li className={`nav-item ${isActive(item.path) ? 'active' : ''}`}>
              {item.submenu ? (
                <button
                  className={`nav-link menu-button ${activeSubmenu === index ? 'active' : ''}`}
                  onClick={() => !isCollapsed && toggleSubmenu(index)}
                >
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {!isCollapsed && (
                    <>
                      <span className="ms-2">{item.title}</span>
                      <FontAwesomeIcon 
                        icon={activeSubmenu === index ? 'chevron-down' : 'chevron-right'} 
                        className="submenu-arrow"
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link to={item.path} className={`nav-link ${isActive(item.path) ? 'active' : ''}`}>
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {!isCollapsed && <span className="ms-2">{item.title}</span>}
                </Link>
              )}
            </li>
            {!isCollapsed && item.submenu && activeSubmenu === index && (
              <div className="submenu">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`nav-link submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={subItem.icon} className="submenu-icon" />
                    <span className="ms-2">{subItem.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;