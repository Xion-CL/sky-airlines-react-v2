import React from 'react';

const TablaReservas = ({ reservas, onEditar, onEliminar }) => {
  if (!reservas || reservas.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No hay reservas registradas
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Pasajero</th>
            <th>RUT</th>
            <th>Vuelo</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.getId()}>
              <td>{reserva.getId()}</td>
              <td>
                {reserva.getPasajero()?.getNombre()} {reserva.getPasajero()?.getApellido()}
              </td>
              <td>{reserva.getPasajero()?.getRut()}</td>
              <td>
                {reserva.getVuelo()?.getOrigen()} → {reserva.getVuelo()?.getDestino()}
              </td>
              <td>
                {new Date(reserva.getVuelo()?.getFecha()).toLocaleDateString('es-CL')}
              </td>
              <td>
                {reserva.getMoneda()} ${reserva.getPrecioFinal()?.toLocaleString('es-CL')}
              </td>
              <td>
                <span className={`badge bg-${reserva.getEstado() === 'confirmada' ? 'success' : 'warning'}`}>
                  {reserva.getEstado()}
                </span>
              </td>
              <td>
                <button 
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEditar(reserva)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => onEliminar(reserva.getId())}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaReservas;