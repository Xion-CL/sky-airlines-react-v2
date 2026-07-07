import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Inicio from './pages/Inicio';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import Reservas from './pages/Reservas';
import CotizadorVuelos from './pages/CotizadorVuelos';
import CalculadoraEdad from './pages/CalculadoraEdad';
import Login from './pages/Login';
import Registro from './pages/Registro';
import ManualUsuario from './pages/ManualUsuario';
import Terminos from './pages/Terminos';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Navbar />
          <main style={{ flex: '1 0 auto', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/cotizador" element={<CotizadorVuelos />} />
              <Route path="/calculadora" element={<CalculadoraEdad />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/manual" element={<ManualUsuario />} />
              <Route path="/terminos" element={<Terminos />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;