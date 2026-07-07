import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-airplane-engines"></i> Sky Airlines
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quienes-somos">Quiénes Somos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cotizador">Cotizador</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservas">Reservas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calculadora">Calculadora</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manual">
                <i className="bi bi-book"></i> Manual
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/terminos">
                <i className="bi bi-file-text"></i> Términos
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <i className="bi bi-person-circle"></i> {usuario.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-light" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;