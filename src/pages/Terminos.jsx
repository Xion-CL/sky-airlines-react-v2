import React, { useState } from 'react';

const Terminos = () => {
  const [estiloActivo, setEstiloActivo] = useState('bootstrap');

  const contenidoTerminos = `
    TÉRMINOS Y CONDICIONES DE USO - SKY AIRLINES
    
    1. ACEPTACIÓN DE LOS TÉRMINOS
    Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso.
    
    2. USO DEL SITIO
    Este sitio web es para uso educativo y demostrativo. No se realizan reservas reales de vuelos.
    
    3. PRIVACIDAD
    Sus datos personales son tratados con confidencialidad y encriptados en nuestro sistema.
    
    4. PROPIEDAD INTELECTUAL
    Todo el contenido del sitio es propiedad de Sky Airlines para fines académicos.
    
    5. LIMITACIÓN DE RESPONSABILIDAD
    El sitio se proporciona "tal cual" sin garantías de ningún tipo.
  `;

  return (
    <div className="container my-5">
      <h1 className="mb-4">Términos y Condiciones de Uso</h1>
      
      {/* Selector de Estilos */}
      <div className="btn-group mb-4" role="group">
        <button 
          type="button" 
          className={`btn ${estiloActivo === 'bootstrap' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setEstiloActivo('bootstrap')}
        >
          Bootstrap
        </button>
        <button 
          type="button" 
          className={`btn ${estiloActivo === 'materialize' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => setEstiloActivo('materialize')}
        >
          Materialize
        </button>
        <button 
          type="button" 
          className={`btn ${estiloActivo === 'bulma' ? 'btn-info' : 'btn-outline-info'}`}
          onClick={() => setEstiloActivo('bulma')}
        >
          Bulma
        </button>
      </div>

      {/* Contenido con diferentes estilos */}
      {estiloActivo === 'bootstrap' && (
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4>Estilo Bootstrap</h4>
          </div>
          <div className="card-body">
            <pre style={{ whiteSpace: 'pre-wrap' }}>{contenidoTerminos}</pre>
          </div>
        </div>
      )}

      {estiloActivo === 'materialize' && (
        <div className="card z-depth-3" style={{ 
          borderRadius: '8px', 
          boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)' 
        }}>
          <div className="card-content" style={{ padding: '24px' }}>
            <span className="card-title" style={{ color: '#ee6e73' }}>Estilo Materialize</span>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Roboto, sans-serif' }}>
              {contenidoTerminos}
            </pre>
          </div>
        </div>
      )}

      {estiloActivo === 'bulma' && (
        <div className="box" style={{ 
          backgroundColor: 'white', 
          borderRadius: '6px', 
          boxShadow: '0 0.5em 1em -0.125em rgba(10,10,10,0.1), 0 0 0 1px rgba(10,10,10,0.02)',
          padding: '1.25rem'
        }}>
          <h4 className="title is-4" style={{ color: '#3273dc' }}>Estilo Bulma</h4>
          <div className="content">
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {contenidoTerminos}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminos;