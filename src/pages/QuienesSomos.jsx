import React from "react";
import { Link } from "react-router-dom";

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-container">
      <h2 className="text-center mb-4">Quiénes Somos</h2>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Sky Airlines</h5>
              <p className="card-text">
                Sky Airlines es una aerolínea chilena comprometida con ofrecer
                el mejor servicio de transporte aéreo a precios competitivos.
                Nuestra base de operaciones se encuentra en Punta Arenas,
                conectando la capital magallánica con las principales ciudades
                de Chile.
              </p>
              <p className="card-text">Nos caracterizamos por:</p>
              <ul>
                <li>Precios transparentes calculados en UF</li>
                <li>Servicio al cliente personalizado</li>
                <li>Rutas nacionales eficientes</li>
                <li>Tecnología de punta en reservas</li>
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Nuestra Misión</h5>
            </div>
            <div className="card-body">
              <p>
                Conectar a las personas y lugares de Chile de manera segura,
                eficiente y accesible, brindando una experiencia de vuelo
                excepcional.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Nuestra Visión</h5>
            </div>
            <div className="card-body">
              <p>
                Ser la aerolínea líder en el sur de Chile, reconocida por
                nuestra calidad de servicio, puntualidad y compromiso con el
                desarrollo de la región.
              </p>
            </div>
          </div>

          {/* 🎯 SECCIÓN DIAGRAMA DE CLASES - ACTIVIDAD N°3 */}
          <div className="card mb-4 border-primary">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                ️ Arquitectura del Sistema - Diagrama de Clases UML
              </h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Diagrama de clases del sistema Sky Airlines
              </p>

              <div className="alert alert-info">
                <h6>📋 Descripción del Diagrama:</h6>
                <ul className="mb-0">
                  <li>
                    <strong>App:</strong> Componente principal que orquesta la
                    aplicación
                  </li>
                  <li>
                    <strong>Pasajero, Vuelo, Reserva:</strong> Clases del
                    dominio del negocio
                  </li>
                  <li>
                    <strong>Cotizador:</strong> Consume la API mindicador.cl
                    para calcular precios
                  </li>
                  <li>
                    <strong>Encriptador:</strong> Cifra datos sensibles antes de
                    guardarlos
                  </li>
                  <li>
                    <strong>StorageManager:</strong> Gestiona el localStorage
                    encriptado
                  </li>
                  <li>
                    <strong>ValidadorRUT:</strong> Valida el RUT chileno
                  </li>
                  <li>
                    <strong>CalculadoraEdad:</strong> Calcula edad desde fecha
                    de nacimiento
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <img
                  src={`${process.env.PUBLIC_URL}/diagrama-de-clases.png`}
                  alt="Diagrama de Clases UML - Sky Airlines"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "800px", width: "100%" }}
                />
                <p className="mt-3 text-muted">
                  <em>
                    Figura 1: Diagrama de Clases UML del sistema Sky Airlines
                  </em>
                </p>
              </div>
            </div>
          </div>

          {/*  SECCIÓN ALGORITMO CALCULADORA DE EDAD */}
          <div className="card mb-4 border-success">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Algoritmo de Cálculo de Edad</h5>
            </div>
            <div className="card-body">
              <p>
                Algoritmo que permite calcular la edad de una persona ingresando
                su fecha de nacimiento.
              </p>

              <div className="bg-light p-3 rounded">
                <h6>📐 Lógica del algoritmo:</h6>
                <ol>
                  <li>Recibe la fecha de nacimiento como parámetro</li>
                  <li>Obtiene la fecha actual del sistema</li>
                  <li>Calcula la diferencia de años entre ambas fechas</li>
                  <li>
                    Ajusta si el cumpleaños del año actual aún no ha ocurrido
                  </li>
                  <li>Retorna la edad exacta en años</li>
                </ol>
              </div>

              <div className="mt-3 text-center">
                <Link to="/calculadora-edad" className="btn btn-success btn-lg">
                  🎂 Probar Calculadora de Edad
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
