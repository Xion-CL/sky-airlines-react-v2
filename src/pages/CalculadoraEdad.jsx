import React, { useState } from 'react';
import { calcularEdad, esMayorDeEdad, calcularDiasHastaCumpleanos } from '../utils/calculadoraEdad';const CalculadoraEdad = () => {
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState(null);
  const [mayorEdad, setMayorEdad] = useState(null);
  const [diasCumpleanos, setDiasCumpleanos] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleChange = (e) => {
    setFechaNacimiento(e.target.value);
  };

  const handleCalcular = () => {
    if (fechaNacimiento) {
      const fecha = new Date(fechaNacimiento);
      const edadCalculada = calcularEdad(fecha);
      const esMayor = esMayorDeEdad(fecha);
      const dias = calcularDiasHastaCumpleanos(fecha);

      setEdad(edadCalculada);
      setMayorEdad(esMayor);
      setDiasCumpleanos(dias);
      setMostrarResultado(true);
    }
  };

  const handleLimpiar = () => {
    setFechaNacimiento('');
    setEdad(null);
    setMayorEdad(null);
    setDiasCumpleanos(null);
    setMostrarResultado(false);
  };

  return (
    <div className="calculadora-edad-container">
      <h2 className="text-center mb-4">Calculadora de Edad</h2>
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Ingrese su Fecha de Nacimiento</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  className="form-control"
                  value={fechaNacimiento}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={handleCalcular}
                  disabled={!fechaNacimiento}
                >
                  Calcular Edad
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleLimpiar}
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>

          {mostrarResultado && (
            <div className="card mt-3" id="resultadoEdad">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Resultado</h5>
              </div>
              <div className="card-body">
                <div className="text-center mb-3">
                  <h1 className="display-4 text-primary">{edad} años</h1>
                  <p className="lead">
                    {mayorEdad ? '✓ Es mayor de edad' : '✗ Es menor de edad'}
                  </p>
                </div>

                <div className="alert alert-info">
                  <strong>Faltan {diasCumpleanos} días</strong> para tu próximo cumpleaños
                </div>

                <div className="mt-3">
                  <h6>Detalles:</h6>
                  <ul className="list-unstyled">
                    <li>• Fecha de nacimiento: {new Date(fechaNacimiento).toLocaleDateString('es-CL')}</li>
                    <li>• Edad actual: {edad} años</li>
                    <li>• Próximo cumpleaños: en {diasCumpleanos} días</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraEdad;