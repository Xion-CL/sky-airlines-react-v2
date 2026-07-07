import React from 'react';

const TablaVuelos = ({ vuelos, onSeleccionar }) => {
  if (!vuelos || vuelos.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No hay vuelos disponibles
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Precio UF</th>
            <th>Precio CLP</th>
            <th>Asientos</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {vuelos.map((vuelo) => (
            <tr key={vuelo.getId()}>
              <td>{vuelo.getOrigen()}</td>
              <td>{vuelo.getDestino()}</td>
              <td>{new Date(vuelo.getFecha()).toLocaleDateString('es-CL')}</td>
              <td>{vuelo.getPrecioBaseUF()} UF</td>
              <td>${vuelo.obtenerPrecioCLP()?.toLocaleString('es-CL')}</td>
              <td>{vuelo.getAsientosDisponibles()}</td>
              <td>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => onSeleccionar(vuelo)}
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaVuelos;