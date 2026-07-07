import React, { useState } from 'react';
import { validarRUT } from '../../utils/validadorRUT';

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rut: '',
    mensaje: ''
  });
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Nombre es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Email inválido';
    }

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido';
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = 'Mensaje es requerido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      setMensajeExito('Mensaje enviado correctamente');
      setFormData({ nombre: '', email: '', rut: '', mensaje: '' });
      setTimeout(() => setMensajeExito(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
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

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
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

      <div className="mb-3">
        <label htmlFor="rut" className="form-label">RUT</label>
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

      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
          rows="4"
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>
        {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar Mensaje
      </button>
    </form>
  );
};

export default FormularioContacto;