import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} Sky Airlines. Todos los derechos reservados.</p>
        <p className="mb-0">
          <small>Proyecto Académico - Programación Front End</small>
        </p>
        <p className="mb-0">
          <small>Sede Punta Arenas - 2026</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;