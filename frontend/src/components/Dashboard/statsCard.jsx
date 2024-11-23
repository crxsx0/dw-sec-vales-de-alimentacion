// src/components/dashboard/StatsCards.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTicketAlt,
  faUtensils,
  faUsers,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const StatsCards = ({ estadisticas }) => {
  const cards = [
    {
      title: 'Vales Emitidos Hoy',
      value: estadisticas.valesEmitidosHoy,
      icon: faTicketAlt,
      color: 'primary'
    },
    {
      title: 'Vales Utilizados',
      value: estadisticas.valesUtilizadosHoy,
      icon: faUtensils,
      color: 'success'
    },
    {
      title: 'Vales No Utilizados',
      value: estadisticas.valesNoUtilizados,
      icon: faExclamationTriangle,
      color: 'warning'
    },
    {
      title: 'Empleados Activos',
      value: estadisticas.empleadosActivos,
      icon: faUsers,
      color: 'info'
    }
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card, index) => (
        <div key={index} className="col-12 col-sm-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className={`bg-${card.color} bg-opacity-10 p-3 rounded`}>
                    <FontAwesomeIcon icon={card.icon} className={`text-${card.color} fs-4`} />
                  </div>
                </div>
                <div>
                  <h6 className="text-muted mb-1">{card.title}</h6>
                  <h4 className="mb-0">{card.value}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;