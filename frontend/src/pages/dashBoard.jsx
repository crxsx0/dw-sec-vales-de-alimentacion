import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, Receipt, Settings, LogOut, PieChart, Clock, CheckCircle, DollarSign, PrinterIcon, Home, History, Calendar } from 'lucide-react';
import '../components/Dashboard/style.css';

const Dashboard = ({ onLogout }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      onLogout(); // Llama a la función que recibimos como prop
      navigate('/');
    };

  return (
    <div className="min-vh-100 bg-light">
      {/* Top Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn btn-light p-2"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ms-3 h4 mb-0">Sistema de Vales</h1>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="small">Juan Pérez</span>
              <div className="bg-light rounded-circle p-1">
                <User className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-sm transition ${sidebarOpen ? 'width-240' : 'width-80'}`}>
          <nav className="p-3">
            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <a href="#" className="nav-link active d-flex align-items-center p-2 rounded">
                  <Home className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Dashboard</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <Receipt className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Mis Vales</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <History className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Historial</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <Calendar className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Turnos</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <Settings className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Configuración</span>}
                </a>
              </li>
              {/* Botón de Cerrar Sesión actualizado */}
              <li className="nav-item">
                <a
                  onClick={handleLogout}
                  className="nav-link d-flex align-items-center p-2 rounded text-danger"
                  style={{ cursor: 'pointer' }}
                >
                  <LogOut className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Cerrar Sesión</span>}
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          {/* El resto del contenido del dashboard permanece igual */}
          <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2">Dashboard</h1>
            <button className="btn btn-primary">
              <PrinterIcon className="me-2" size={16} />
              Imprimir Vale
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {/* Current Meal Voucher */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card stats-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <Receipt className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title mb-1">Vale Actual</h6>
                      <h3 className="mb-0">Almuerzo</h3>
                      <small className="text-muted">12:00 - 15:00</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Used Vouchers */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card stats-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <CheckCircle className="text-success" />
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title mb-1">Vales Usados</h6>
                      <h3 className="mb-0">15/20</h3>
                      <small className="text-muted">Este mes</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Shift */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card stats-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-info bg-opacity-10 p-3 rounded">
                        <Clock className="text-info" />
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title mb-1">Turno Actual</h6>
                      <h3 className="mb-0">Turno 1</h3>
                      <small className="text-muted">8:00 - 16:00</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Value */}
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card stats-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-warning bg-opacity-10 p-3 rounded">
                        <DollarSign className="text-warning" />
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title mb-1">Valor Vale</h6>
                      <h3 className="mb-0">$5.000</h3>
                      <small className="text-muted">Almuerzo</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity and Next Meals */}
          <div className="row">
            {/* Recent Activity */}
            <div className="col-12 col-xl-8 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Actividad Reciente</h5>
                  <button className="btn btn-sm btn-link">Ver todo</button>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item px-0">
                      <div className="d-flex align-items-center">
                        <div className="bg-success bg-opacity-10 p-2 rounded me-3">
                          <CheckCircle className="text-success" size={20} />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Vale de almuerzo impreso</h6>
                            <small className="text-muted">12:30</small>
                          </div>
                          <small className="text-muted">Casino Central</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Meals */}
            <div className="col-12 col-xl-4 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Próximas Comidas</h5>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Almuerzo</h6>
                          <small className="text-muted">12:00 - 15:00</small>
                        </div>
                        <span className="badge bg-primary">Disponible</span>
                      </div>
                    </div>
                    <div className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Once</h6>
                          <small className="text-muted">16:00 - 17:00</small>
                        </div>
                        <span className="badge bg-secondary">Próximo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;