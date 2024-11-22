// src/components/MainLayout.jsx
import React from 'react';
import { Menu, User, Receipt, Settings, LogOut, PieChart } from 'lucide-react';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar superior */}
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
              <h1 className="ms-3 h4 mb-0">Sistema de Vales de Alimentación</h1>
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
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <Receipt className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Mis Vales</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <PieChart className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Reportes</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded">
                  <Settings className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Configuración</span>}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center p-2 rounded text-danger">
                  <LogOut className="h-5 w-5" />
                  {sidebarOpen && <span className="ms-3">Cerrar Sesión</span>}
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-grow-1 p-4">
          <div className="row g-4">
            {/* Card de Vale Disponible */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title h5 mb-4">Vale Disponible</h2>
                  <div>
                    <p className="small text-muted mb-2">Turno actual: 8:00 - 16:00</p>
                    <p className="small text-muted mb-3">Servicios: Desayuno + Almuerzo</p>
                    <button className="btn btn-primary w-100">
                      Imprimir Vale
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Últimos Vales */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title h5 mb-4">Últimos Vales</h2>
                  <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small">Almuerzo</span>
                      <span className="small text-muted">Hace 2 días</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="small">Desayuno</span>
                      <span className="small text-muted">Hace 2 días</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Estadísticas */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title h5 mb-4">Estadísticas</h2>
                  <div>
                    <p className="small text-muted mb-2">Vales utilizados este mes: 15</p>
                    <p className="small text-muted">Vales disponibles: 2</p>
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

export default MainLayout;