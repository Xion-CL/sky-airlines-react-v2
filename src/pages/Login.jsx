import React from 'react';
import { Link } from 'react-router-dom';
import FormularioLogin from '../components/forms/FormularioLogin';

const Login = () => {
  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">Iniciar Sesión</h4>
            </div>
            <div className="card-body">
              <FormularioLogin />
              
              <hr />
              
              <div className="text-center">
                <p className="mb-0">
                  ¿No tienes cuenta?{' '}
                  <Link to="/registro">Regístrate aquí</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;