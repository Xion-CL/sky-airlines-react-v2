import React from 'react';

const ManualUsuario = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Manual de Usuario - Sky Airlines</h1>
      
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3>1. Inicio y Navegación</h3>
        </div>
        <div className="card-body">
          <p>Al ingresar al sistema, verás la página de inicio con un carrusel informativo.</p>
          <ul>
            <li><strong>Inicio:</strong> Página principal con información general</li>
            <li><strong>Quiénes Somos:</strong> Información de la empresa</li>
            <li><strong>Cotizador:</strong> Calcula precios en tiempo real</li>
            <li><strong>Reservas:</strong> Gestiona tus reservas (CRUD completo)</li>
            <li><strong>Calculadora:</strong> Calcula edades</li>
            <li><strong>Contacto:</strong> Formulario de contacto</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h3>2. Sistema de Reservas (CRUD)</h3>
        </div>
        <div className="card-body">
          <h5>Crear Reserva:</h5>
          <ol>
            <li>Haz clic en "Nueva Reserva"</li>
            <li>Completa el formulario con datos del pasajero</li>
            <li>Selecciona origen, destino y fecha</li>
            <li>Elige la moneda (UF, USD, EUR, CLP)</li>
            <li>Haz clic en "Guardar"</li>
          </ol>

          <h5>Editar Reserva:</h5>
          <ol>
            <li>Busca la reserva en la tabla</li>
            <li>Haz clic en "Editar"</li>
            <li>Modifica los datos necesarios</li>
            <li>Haz clic en "Actualizar"</li>
          </ol>

          <h5>Eliminar Reserva:</h5>
          <ol>
            <li>Busca la reserva en la tabla</li>
            <li>Haz clic en "Eliminar"</li>
            <li>Confirma la eliminación</li>
          </ol>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h3>3. Cotizador de Vuelos</h3>
        </div>
        <div className="card-body">
          <ol>
            <li>Ingresa el precio base en UF</li>
            <li>Selecciona la moneda de conversión</li>
            <li>El sistema consultará la API de mindicador.cl</li>
            <li>Verás el precio actualizado en tiempo real</li>
          </ol>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h3>4. Autenticación</h3>
        </div>
        <div className="card-body">
          <h5>Registro:</h5>
          <ol>
            <li>Haz clic en "Iniciar Sesión"</li>
            <li>Selecciona "Registrarse"</li>
            <li>Completa todos los campos obligatorios</li>
            <li>Tu contraseña será encriptada con Salt</li>
          </ol>

          <h5>Login:</h5>
          <ol>
            <li>Ingresa tu RUT y contraseña</li>
            <li>El sistema validará tus credenciales</li>
            <li>Accederás a las funciones protegidas</li>
          </ol>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-danger text-white">
          <h3>5. Validaciones del Sistema</h3>
        </div>
        <div className="card-body">
          <ul>
            <li><strong>RUT:</strong> Validación completa del RUT chileno con dígito verificador</li>
            <li><strong>Email:</strong> Formato de correo electrónico válido</li>
            <li><strong>Fechas:</strong> No se permiten fechas pasadas</li>
            <li><strong>Campos obligatorios:</strong> Todos los campos marcados con * son requeridos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManualUsuario;