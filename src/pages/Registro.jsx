import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hashPassword, generarSalt } from '../utils/hashing';
import { guardarUsuario } from '../services/StorageService';
import { validarRUT } from '../utils/validadorRUT';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rut: ''
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

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

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Email inválido';
    }

    if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const salt = generarSalt();
      const hashedPassword = hashPassword(formData.password, salt);

      const nuevoUsuario = {
        id: Date.now(),
        nombre: formData.nombre,
        email: formData.email,
        rut: formData.rut,
        password: hashedPassword,
        salt: salt,
        fechaRegistro: new Date().toISOString()
      };

      guardarUsuario(nuevoUsuario);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="registro-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-success text-white text-center">
              <h4 className="mb-0">Crear Cuenta</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errores.confirmPassword && <div className="invalid-feedback">{errores.confirmPassword}</div>}
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;