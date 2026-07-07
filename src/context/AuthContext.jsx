import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const login = async (rut, password) => {
    try {
      // Aquí podrías conectar con tu API
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioEncontrado = usuarios.find(u => u.rut === rut && u.password === password);
      
      if (usuarioEncontrado) {
        const { password, ...usuarioSinPassword } = usuarioEncontrado;
        setUsuario(usuarioSinPassword);
        localStorage.setItem('usuario', JSON.stringify(usuarioSinPassword));
        return { success: true, usuario: usuarioSinPassword };
      } else {
        return { success: false, message: 'RUT o contraseña incorrectos' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error al iniciar sesión' };
    }
  };

  const register = async (userData) => {
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Verificar si el RUT ya existe
      if (usuarios.find(u => u.rut === userData.rut)) {
        return { success: false, message: 'El RUT ya está registrado' };
      }

      // Guardar usuario (en un caso real, la contraseña debería estar encriptada)
      const nuevoUsuario = {
        ...userData,
        id: Date.now(),
        fechaRegistro: new Date().toISOString()
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      const { password, ...usuarioSinPassword } = nuevoUsuario;
      setUsuario(usuarioSinPassword);
      localStorage.setItem('usuario', JSON.stringify(usuarioSinPassword));

      return { success: true, usuario: usuarioSinPassword };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, message: 'Error al registrar usuario' };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const value = {
    usuario,
    cargando,
    login,
    register,
    logout,
    isAuthenticated: !!usuario
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};