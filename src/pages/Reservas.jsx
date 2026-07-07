import React, { useState, useEffect } from 'react';
import Pasajero from '../models/Pasajero';
import Vuelo from '../models/Vuelo';
import Reserva from '../models/Reserva';
import { validarRUT, formatearRUT } from '../utils/validadorRUT';
import { calcularEdad } from '../utils/calculadoraEdad';
import { calcularPrecioVuelo } from '../services/mindicadorAPI';
import { apiService } from '../services/apiService';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    pasaporte: '',
    origen: 'PUQ',
    destino: 'SCL',
    fechaVuelo: '',
    precioBaseUF: 0.15,
    moneda: 'CLP'
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const aeropuertos = [
    { codigo: 'PUQ', nombre: 'Punta Arenas' },
    { codigo: 'SCL', nombre: 'Santiago' },
    { codigo: 'IPC', nombre: 'Isla de Pascua' },
    { codigo: 'ANF', nombre: 'Antofagasta' }
  ];

  const monedas = [
    { codigo: 'CLP', nombre: 'Pesos Chilenos' },
    { codigo: 'UF', nombre: 'UF' },
    { codigo: 'USD', nombre: 'Dólar' },
    { codigo: 'EUR', nombre: 'Euro' }
  ];

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const reservasData = await apiService.getReservas();
      setReservas(reservasData);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      setMensaje('Error al cargar las reservas desde la API');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido';
    }
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Nombre es requerido';
    }
    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'Apellido es requerido';
    }
    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'Fecha de nacimiento es requerida';
    } else {
      const edad = calcularEdad(new Date(formData.fechaNacimiento));
      if (edad < 18) {
        nuevosErrores.fechaNacimiento = 'Debe ser mayor de 18 años';
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Email inválido';
    }
    if (!/^\+?[\d\s-]{8,}$/.test(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido';
    }
    if (!formData.pasaporte.trim()) {
      nuevosErrores.pasaporte = 'Pasaporte es requerido';
    }
    if (!formData.fechaVuelo) {
      nuevosErrores.fechaVuelo = 'Fecha de vuelo es requerida';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      setMensaje('Por favor corrija los errores en el formulario');
      return;
    }

    try {
      const precioData = await calcularPrecioVuelo(formData.precioBaseUF, formData.moneda);

      const reservaData = {
        pasajero: {
          rut: formatearRUT(formData.rut),
          nombre: formData.nombre,
          apellido: formData.apellido,
          fechaNacimiento: formData.fechaNacimiento,
          email: formData.email,
          telefono: formData.telefono,
          pasaporte: formData.pasaporte
        },
        vuelo: {
          id: modoEdicion ? reservaEditando.vuelo.id : Date.now(),
          origen: formData.origen,
          destino: formData.destino,
          fecha: formData.fechaVuelo,
          precioBaseUF: formData.precioBaseUF,
          asientosDisponibles: 100,
          aerolinea: 'Sky Airlines'
        },
        fechaReserva: new Date().toISOString(),
        estado: 'confirmada',
        precioFinal: precioData.valor,
        moneda: formData.moneda
      };

      if (modoEdicion) {
        await apiService.updateReserva(reservaEditando.id, reservaData);
        setMensaje('Reserva actualizada correctamente');
      } else {
        await apiService.createReserva(reservaData);
        setMensaje('Reserva creada correctamente');
      }

      limpiarFormulario();
      cargarReservas();
      setMostrarFormulario(false);
      setModoEdicion(false);
      setReservaEditando(null);

    } catch (error) {
      console.error('Error al guardar reserva:', error);
      setMensaje('Error al guardar la reserva');
    }
  };

  const handleEditar = (reserva) => {
    setReservaEditando(reserva);
    setModoEdicion(true);
    
    const pasajero = reserva.pasajero;
    const vuelo = reserva.vuelo;
    
    setFormData({
      rut: pasajero.rut,
      nombre: pasajero.nombre,
      apellido: pasajero.apellido,
      fechaNacimiento: pasajero.fechaNacimiento.split('T')[0],
      email: pasajero.email,
      telefono: pasajero.telefono,
      pasaporte: pasajero.pasaporte,
      origen: vuelo.origen,
      destino: vuelo.destino,
      fechaVuelo: vuelo.fecha.split('T')[0],
      precioBaseUF: vuelo.precioBaseUF,
      moneda: reserva.moneda
    });
    
    setMostrarFormulario(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta reserva?')) {
      try {
        await apiService.deleteReserva(id);
        setMensaje('Reserva eliminada correctamente');
        cargarReservas();
      } catch (error) {
        console.error('Error al eliminar:', error);
        setMensaje('Error al eliminar la reserva');
      }
    }
  };

  const handleNuevo = () => {
    limpiarFormulario();
    setModoEdicion(false);
    setReservaEditando(null);
    setMostrarFormulario(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelar = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
    setModoEdicion(false);
    setReservaEditando(null);
    setErrores({});
  };

  const limpiarFormulario = () => {
    setFormData({
      rut: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      email: '',
      telefono: '',
      pasaporte: '',
      origen: 'PUQ',
      destino: 'SCL',
      fechaVuelo: '',
      precioBaseUF: 0.15,
      moneda: 'CLP'
    });
    setErrores({});
    setMensaje('');
  };

  // Filtrar reservas
  const reservasFiltradas = reservas.filter(reserva => {
    const texto = filtroBusqueda.toLowerCase();
    return (
      reserva.pasajero?.rut?.toLowerCase().includes(texto) ||
      `${reserva.pasajero?.nombre} ${reserva.pasajero?.apellido}`.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="reservas-container container my-4">
      <h2 className="text-center mb-4">Gestión de Reservas - Sky Airlines</h2>

      {mensaje && (
        <div className={`alert ${mensaje.includes('Error') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert">
          {mensaje}
          <button type="button" className="btn-close" onClick={() => setMensaje('')}></button>
        </div>
      )}

      {/* Colapsable para filtros - INTEGRADO CORRECTAMENTE */}
      <div className="accordion mb-3" id="accordionFiltros">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltros">
              <i className="bi bi-funnel me-2"></i>Filtros de Búsqueda
            </button>
          </h2>
          <div id="collapseFiltros" className="accordion-collapse collapse show" data-bs-parent="#accordionFiltros">
            <div className="accordion-body">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar por RUT o nombre..."
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón Nuevo */}
      <div className="mb-3">
        <button 
          className="btn btn-primary" 
          onClick={handleNuevo}
          style={{ display: mostrarFormulario ? 'none' : 'inline-block' }}
        >
          <i className="bi bi-plus-circle me-2"></i>Nueva Reserva
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="card mb-4" id="formularioReserva">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              {modoEdicion ? 'Editar Reserva' : 'Nueva Reserva'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h6 className="mb-3">Datos del Pasajero</h6>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="rut" className="form-label">RUT *</label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
                    value={formData.rut}
                    onChange={handleChange}
                    placeholder="12.345.678-9"
                  />
                  {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido *</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                  {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    className={`form-control ${errores.fechaNacimiento ? 'is-invalid' : ''}`}
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                  {errores.fechaNacimiento && <div className="invalid-feedback">{errores.fechaNacimiento}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                  {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="pasaporte" className="form-label">Pasaporte *</label>
                  <input
                    type="text"
                    id="pasaporte"
                    name="pasaporte"
                    className={`form-control ${errores.pasaporte ? 'is-invalid' : ''}`}
                    value={formData.pasaporte}
                    onChange={handleChange}
                  />
                  {errores.pasaporte && <div className="invalid-feedback">{errores.pasaporte}</div>}
                </div>
              </div>

              <hr />
              <h6 className="mb-3">Datos del Vuelo</h6>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="origen" className="form-label">Origen</label>
                  <select
                    id="origen"
                    name="origen"
                    className="form-select"
                    value={formData.origen}
                    onChange={handleChange}
                  >
                    {aeropuertos.map(a => (
                      <option key={a.codigo} value={a.codigo}>{a.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="destino" className="form-label">Destino</label>
                  <select
                    id="destino"
                    name="destino"
                    className="form-select"
                    value={formData.destino}
                    onChange={handleChange}
                  >
                    {aeropuertos.map(a => (
                      <option key={a.codigo} value={a.codigo}>{a.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="fechaVuelo" className="form-label">Fecha de Vuelo *</label>
                  <input
                    type="date"
                    id="fechaVuelo"
                    name="fechaVuelo"
                    className={`form-control ${errores.fechaVuelo ? 'is-invalid' : ''}`}
                    value={formData.fechaVuelo}
                    onChange={handleChange}
                  />
                  {errores.fechaVuelo && <div className="invalid-feedback">{errores.fechaVuelo}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="moneda" className="form-label">Moneda</label>
                  <select
                    id="moneda"
                    name="moneda"
                    className="form-select"
                    value={formData.moneda}
                    onChange={handleChange}
                  >
                    {monedas.map(m => (
                      <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="precioBaseUF" className="form-label">
                    Precio Base (UF): {formData.precioBaseUF}
                  </label>
                  <input
                    type="range"
                    id="precioBaseUF"
                    name="precioBaseUF"
                    className="form-range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={formData.precioBaseUF}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  {modoEdicion ? 'Actualizar' : 'Guardar'} Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de Reservas */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Listado de Reservas</h5>
        </div>
        <div className="card-body">
          {reservasFiltradas.length === 0 ? (
            <div className="alert alert-info text-center">
              No hay reservas registradas
            </div>
          ) : (
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
                  {reservasFiltradas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.id}</td>
                      <td>
                        {reserva.pasajero?.nombre} {reserva.pasajero?.apellido}
                      </td>
                      <td>{reserva.pasajero?.rut}</td>
                      <td>
                        {reserva.vuelo?.origen} → {reserva.vuelo?.destino}
                      </td>
                      <td>
                        {new Date(reserva.vuelo?.fecha).toLocaleDateString('es-CL')}
                      </td>
                      <td>
                        {reserva.moneda} ${reserva.precioFinal?.toLocaleString('es-CL')}
                      </td>
                      <td>
                        <span className={`badge bg-${reserva.estado === 'confirmada' ? 'success' : 'warning'}`}>
                          {reserva.estado}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEditar(reserva)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(reserva.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservas;