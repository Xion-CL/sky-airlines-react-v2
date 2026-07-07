import React, { createContext, useContext, useState, useEffect } from 'react';
import { guardarCarrito, obtenerCarrito } from '../services/StorageService';

const CarritoContext = createContext(null);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = obtenerCarrito();
    setCarrito(carritoGuardado);
  }, []);

  const agregarAlCarrito = (reserva) => {
    const nuevoCarrito = [...carrito, reserva];
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    guardarCarrito([]);
  };

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    limpiarCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export default useCarrito;