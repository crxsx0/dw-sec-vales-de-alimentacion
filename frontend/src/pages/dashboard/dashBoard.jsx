// src/pages/dashboard/Dashboard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTicketAlt,
  faChartLine,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import StatsCards from '../../components/Dashboard/statsCard';
import MealSchedule from '../../components/Dashboard/MealSchedule';
import ActivityList from '../../components/Dashboard/activityList';
import Sidebar from '../../components/layout/sideBar';

const Dashboard = () => {
  // Datos de ejemplo
  const estadisticas = {
    valesEmitidosHoy: 245,
    valesUtilizadosHoy: 200,
    empleadosActivos: 500,
    serviciosDisponibles: 4,
    valesNoUtilizados: 45,
    turnoActual: 1
  };

  return (
    <>
      {/* Título del Dashboard */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Control</h2>
        <div className="text-muted">
          <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Componentes del Dashboard */}
      <StatsCards estadisticas={estadisticas} />

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <MealSchedule turnoActual={estadisticas.turnoActual} />
        </div>
        <div className="col-12 col-lg-6">
          <ActivityList />
        </div>
      </div>

      {/* Botones de Acción Rápida */}
      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="card-title mb-0">Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                  Emitir Vale
                </button>
                <button className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Generar Reporte
                </button>
                <button className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Gestionar Usuarios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;