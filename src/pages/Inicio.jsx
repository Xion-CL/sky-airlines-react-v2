import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inicio = () => {
  const bannerStyle = {
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  };

  // Slide 1 - Santiago
  const banner1Style = {
    ...bannerStyle,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1689850543263-01a52ccc6943?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
  };

  // Slide 2 - Torres del Paine/Patagonia
  const banner2Style = {
    ...bannerStyle,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://plus.unsplash.com/premium_photo-1697729940854-0f73aadaff88?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
  };

  // Slide 3 - Isla de Pascua
  const banner3Style = {
    ...bannerStyle,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1524536120883-854d2c00bf1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
  };

  const captionStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '15px',
    color: 'white',
    maxWidth: '800px',
    width: '90%'
  };

  return (
    <div>
      <div id="bannerCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2"></button>
        </div>
        
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={banner1Style}>
              <div style={captionStyle}>
                <h1 className="display-3 fw-bold">Bienvenido a Sky Airlines</h1>
                <p className="lead">Tu mejor opción para viajar por Chile</p>
                <Link to="/cotizador" className="btn btn-primary btn-lg me-3">
                  Cotizar Vuelo
                </Link>
                <Link to="/reservas" className="btn btn-outline-light btn-lg">
                  Ver Reservas
                </Link>
              </div>
            </div>
          </div>
          
          <div className="carousel-item">
            <div style={banner2Style}>
              <div style={captionStyle}>
                <h1 className="display-3 fw-bold">Descubre el Sur de Chile</h1>
                <p className="lead">Punta Arenas y Torres del Paine te esperan</p>
                <Link to="/cotizador" className="btn btn-success btn-lg">
                  Ver Ofertas
                </Link>
              </div>
            </div>
          </div>
          
          <div className="carousel-item">
            <div style={banner3Style}>
              <div style={captionStyle}>
                <h1 className="display-3 fw-bold">Destinos Increíbles</h1>
                <p className="lead">Desde el desierto hasta la isla más remota</p>
                <Link to="/quienes-somos" className="btn btn-info btn-lg">
                  Conoce Más
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <div className="feature-box p-4 shadow-sm rounded">
              <i className="bi bi-currency-dollar display-4 text-primary"></i>
              <h3 className="mt-3">Precios en Tiempo Real</h3>
              <p>Cotizamos tus vuelos usando la UF, Dólar y Euro actualizado del día</p>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="feature-box p-4 shadow-sm rounded">
              <i className="bi bi-shield-lock display-4 text-success"></i>
              <h3 className="mt-3">Datos Seguros</h3>
              <p>Tu información está encriptada y protegida en nuestro sistema</p>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="feature-box p-4 shadow-sm rounded">
              <i className="bi bi-airplane display-4 text-info"></i>
              <h3 className="mt-3">Vuelos Nacionales</h3>
              <p>Conectamos las principales ciudades de Chile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;