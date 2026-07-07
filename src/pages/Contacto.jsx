import React from 'react';
import FormularioContacto from '../components/forms/FormularioContacto';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2 className="text-center mb-4">Contacto</h2>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Envíanos un Mensaje</h5>
            </div>
            <div className="card-body">
              <FormularioContacto />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Información de Contacto</h5>
            </div>
            <div className="card-body">
              <h6>Dirección:</h6>
              <p>
                Aeropuerto Internacional Presidente Carlos Ibáñez del Campo<br />
                Punta Arenas, Chile
              </p>
              
              <h6>Teléfono:</h6>
              <p>+56 61 234 5678</p>
              
              <h6>Email:</h6>
              <p>contacto@skyairlines.cl</p>
              
              <h6>Horario de Atención:</h6>
              <p>Lunes a Domingo: 08:00 - 20:00 hrs</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Ubicación</h5>
            </div>
            <div className="card-body">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.1234567890123!2d-70.854!3d-53.002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDAwJzA3LjIiUyA3MMKwNTEnMTQuNCJX!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mapa Ubicación"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;