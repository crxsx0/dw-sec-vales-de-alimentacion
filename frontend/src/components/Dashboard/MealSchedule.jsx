// src/components/dashboard/MealSchedule.jsx
import React from 'react';

const MealSchedule = ({ turnoActual }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="card-title mb-0">Turno Actual</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th>Turno:</th>
                <td>{turnoActual} (8:00 - 16:00)</td>
              </tr>
              <tr>
                <th>Servicios:</th>
                <td>Desayuno + Almuerzo</td>
              </tr>
              <tr>
                <th>Empleados en turno:</th>
                <td>167</td>
              </tr>
              <tr>
                <th>Vales disponibles:</th>
                <td>334 (2 por empleado)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MealSchedule;