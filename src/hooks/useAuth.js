import { useState, useEffect, createContext, useContext } from 'react';
import { autenticarUsuario } from '../services/AuthService';
import { guardarEnStorage, obtenerDeStorage } from '../services/StorageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = obtenerDeStorage('sky_airlines_session');
    if (session) {
      setUser(session);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const usuario = autenticarUsuario(email, password);
      
      if (usuario) {
        setUser(usuario);
        setIsAuthenticated(true);
        guardarEnStorage('sky_airlines_session', usuario);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sky_airlines_session');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default useAuth;