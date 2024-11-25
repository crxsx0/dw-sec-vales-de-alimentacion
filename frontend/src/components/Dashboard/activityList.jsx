// src/components/dashboard/ActivityList.jsx
import React from 'react';

const ActivityList = () => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="card-title mb-0">Estado de Casinos</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Casino</th>
                <th>Estado</th>
                <th>Capacidad</th>
                <th>En uso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cafetería Central</td>
                <td><span className="badge bg-success">Abierto</span></td>
                <td>100</td>
                <td>45</td>
              </tr>
              <tr>
                <td>Comedor Principal</td>
                <td><span className="badge bg-success">Abierto</span></td>
                <td>200</td>
                <td>122</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;