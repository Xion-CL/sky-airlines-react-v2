const API_URL = 'http://localhost:3001';

export const apiService = {
  // Reservas
  async getReservas() {
    const response = await fetch(`${API_URL}/reservas`);
    return await response.json();
  },

  async createReserva(reserva) {
    const response = await fetch(`${API_URL}/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva)
    });
    return await response.json();
  },

  async updateReserva(id, reserva) {
    const response = await fetch(`${API_URL}/reservas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva)
    });
    return await response.json();
  },

  async deleteReserva(id) {
    await fetch(`${API_URL}/reservas/${id}`, {
      method: 'DELETE'
    });
  },

  // Vuelos
  async getVuelos() {
    const response = await fetch(`${API_URL}/vuelos`);
    return await response.json();
  },

  // Usuarios
  async getUsuarios() {
    const response = await fetch(`${API_URL}/usuarios`);
    return await response.json();
  },

  async createUsuario(usuario) {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    return await response.json();
  }
};