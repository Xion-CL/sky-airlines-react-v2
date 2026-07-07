// Configuración
const API_URL = 'http://localhost:3001';

// Detectar entorno
const isProduction = () => {
  return !window.location.hostname.includes('localhost') && 
         !window.location.hostname.includes('127.0.0.1');
};

// Servicio de almacenamiento local (simula una API)
const localStorageAPI = {
  // Inicializar datos si no existen
  init: () => {
    if (!localStorage.getItem('sky_reservas')) {
      localStorage.setItem('sky_reservas', JSON.stringify([]));
    }
    if (!localStorage.getItem('sky_usuarios')) {
      localStorage.setItem('sky_usuarios', JSON.stringify([]));
    }
    if (!localStorage.getItem('sky_vuelos')) {
      const vuelosDefault = [
        {
          id: '1',
          origen: 'PUQ',
          destino: 'SCL',
          fecha: '2026-08-01',
          precioBaseUF: 5.5,
          asientosDisponibles: 100,
          aerolinea: 'Sky Airlines'
        },
        {
          id: '2',
          origen: 'SCL',
          destino: 'PUQ',
          fecha: '2026-08-15',
          precioBaseUF: 3.2,
          asientosDisponibles: 150,
          aerolinea: 'Sky Airlines'
        }
      ];
      localStorage.setItem('sky_vuelos', JSON.stringify(vuelosDefault));
    }
  },

  // GET - Simular fetch GET
  get: (collection) => {
    localStorageAPI.init();
    const data = localStorage.getItem(`sky_${collection}`);
    return Promise.resolve(JSON.parse(data || '[]'));
  },

  // POST - Simular fetch POST
  post: (collection, item) => {
    localStorageAPI.init();
    const data = JSON.parse(localStorage.getItem(`sky_${collection}`) || '[]');
    const newItem = { ...item, id: Date.now().toString() };
    data.push(newItem);
    localStorage.setItem(`sky_${collection}`, JSON.stringify(data));
    return Promise.resolve(newItem);
  },

  // PUT - Simular fetch PUT
  put: (collection, id, updatedItem) => {
    localStorageAPI.init();
    let data = JSON.parse(localStorage.getItem(`sky_${collection}`) || '[]');
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...updatedItem, id };
      localStorage.setItem(`sky_${collection}`, JSON.stringify(data));
      return Promise.resolve(data[index]);
    }
    return Promise.reject(new Error('Item not found'));
  },

  // DELETE - Simular fetch DELETE
  delete: (collection, id) => {
    localStorageAPI.init();
    let data = JSON.parse(localStorage.getItem(`sky_${collection}`) || '[]');
    data = data.filter(item => item.id !== id);
    localStorage.setItem(`sky_${collection}`, JSON.stringify(data));
    return Promise.resolve();
  }
};

// Servicio API principal
export const apiService = {
  // ========== RESERVAS ==========
  
  async getReservas() {
    console.log('📡 API: Obteniendo reservas...');
    
    if (isProduction()) {
      // Producción: Usar localStorage API
      console.log('🌐 Modo: GitHub Pages - localStorage API');
      return await localStorageAPI.get('reservas');
    } else {
      // Desarrollo: Intentar json-server primero
      try {
        console.log('🌐 Modo: Desarrollo - json-server API');
        const response = await fetch(`${API_URL}/reservas`);
        if (!response.ok) throw new Error('API no disponible');
        const data = await response.json();
        console.log('✅ Reservas obtenidas de json-server:', data);
        return data;
      } catch (error) {
        console.warn('⚠️ json-server no disponible, usando localStorage API');
        return await localStorageAPI.get('reservas');
      }
    }
  },

  async createReserva(reserva) {
    console.log('📡 API: Creando reserva...', reserva);
    
    if (isProduction()) {
      console.log('🌐 Modo: GitHub Pages - localStorage API');
      return await localStorageAPI.post('reservas', reserva);
    } else {
      try {
        console.log('🌐 Modo: Desarrollo - json-server API');
        const response = await fetch(`${API_URL}/reservas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reserva)
        });
        if (!response.ok) throw new Error('API no disponible');
        const data = await response.json();
        console.log('✅ Reserva creada en json-server:', data);
        return data;
      } catch (error) {
        console.warn('⚠️ json-server no disponible, usando localStorage API');
        return await localStorageAPI.post('reservas', reserva);
      }
    }
  },

  async updateReserva(id, reservaActualizada) {
    console.log('📡 API: Actualizando reserva...', id, reservaActualizada);
    
    if (isProduction()) {
      console.log('🌐 Modo: GitHub Pages - localStorage API');
      return await localStorageAPI.put('reservas', id, reservaActualizada);
    } else {
      try {
        console.log('🌐 Modo: Desarrollo - json-server API');
        const response = await fetch(`${API_URL}/reservas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservaActualizada)
        });
        if (!response.ok) throw new Error('API no disponible');
        const data = await response.json();
        console.log('✅ Reserva actualizada en json-server:', data);
        return data;
      } catch (error) {
        console.warn('⚠️ json-server no disponible, usando localStorage API');
        return await localStorageAPI.put('reservas', id, reservaActualizada);
      }
    }
  },

  async deleteReserva(id) {
    console.log('📡 API: Eliminando reserva...', id);
    
    if (isProduction()) {
      console.log('🌐 Modo: GitHub Pages - localStorage API');
      return await localStorageAPI.delete('reservas', id);
    } else {
      try {
        console.log('🌐 Modo: Desarrollo - json-server API');
        const response = await fetch(`${API_URL}/reservas/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('API no disponible');
        console.log('✅ Reserva eliminada de json-server');
        return;
      } catch (error) {
        console.warn('⚠️ json-server no disponible, usando localStorage API');
        return await localStorageAPI.delete('reservas', id);
      }
    }
  },

  // ========== USUARIOS ==========
  
  async getUsuarios() {
    if (isProduction()) {
      return await localStorageAPI.get('usuarios');
    } else {
      try {
        const response = await fetch(`${API_URL}/usuarios`);
        if (!response.ok) throw new Error();
        return await response.json();
      } catch (error) {
        return await localStorageAPI.get('usuarios');
      }
    }
  },

  async createUsuario(usuario) {
    if (isProduction()) {
      return await localStorageAPI.post('usuarios', usuario);
    } else {
      try {
        const response = await fetch(`${API_URL}/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuario)
        });
        if (!response.ok) throw new Error();
        return await response.json();
      } catch (error) {
        return await localStorageAPI.post('usuarios', usuario);
      }
    }
  },

  // ========== VUELOS ==========
  
  async getVuelos() {
    if (isProduction()) {
      return await localStorageAPI.get('vuelos');
    } else {
      try {
        const response = await fetch(`${API_URL}/vuelos`);
        if (!response.ok) throw new Error();
        return await response.json();
      } catch (error) {
        return await localStorageAPI.get('vuelos');
      }
    }
  }
};

export default apiService;