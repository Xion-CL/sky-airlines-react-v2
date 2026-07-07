import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="site-footer" 
      style={{
        backgroundColor: '#212529',
        color: 'white',
        padding: '2rem 0',
        width: '100%',
        flexShrink: 0,
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-1" style={{ color: 'white' }}>
              <strong>Sky Airlines</strong> - Sistema de Reservas de Vuelos
            </p>
            <p className="mb-1 small" style={{ color: '#adb5bd' }}>
              © {currentYear} Sky Airlines. Todos los derechos reservados.
            </p>
            <p className="mb-0 small" style={{ color: '#6c757d' }}>
              Proyecto Académico - Programación Front End<br />
              Sede Punta Arenas - {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;