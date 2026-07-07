import { cifrar, descifrar, cifrarObjeto, descifrarObjeto } from '../utils/encriptador';

const KEYS = {
  RESERVAS: 'sky_airlines_reservas',
  USUARIOS: 'sky_airlines_usuarios',
  CARRITO: 'sky_airlines_carrito',
  SESSION: 'sky_airlines_session'
};

/**
 * Guarda datos en localStorage con encriptación
 * @param {string} key - Clave de almacenamiento
 * @param {any} data - Datos a guardar
 */
export const guardarEnStorage = (key, data) => {
  try {
    const dataString = JSON.stringify(data);
    const dataEncriptado = cifrar(dataString);
    localStorage.setItem(key, dataEncriptado);
  } catch (error) {
    console.error('Error al guardar en storage:', error);
    throw error;
  }
};

/**
 * Obtiene datos de localStorage con desencriptación
 * @param {string} key - Clave de almacenamiento
 * @returns {any|null} Datos obtenidos o null
 */
export const obtenerDeStorage = (key) => {
  try {
    const dataEncriptado = localStorage.getItem(key);
    if (!dataEncriptado) return null;
    
    const dataString = descifrar(dataEncriptado);
    return JSON.parse(dataString);
  } catch (error) {
    console.error('Error al obtener de storage:', error);
    return null;
  }
};

/**
 * Guarda una reserva en localStorage
 * @param {Object} reserva - Reserva a guardar
 */
export const guardarReserva = (reserva) => {
  const reservas = obtenerReservas() || [];
  reservas.push(reserva);
  guardarEnStorage(KEYS.RESERVAS, reservas);
};

/**
 * Obtiene todas las reservas
 * @returns {Array} Array de reservas
 */
export const obtenerReservas = () => {
  return obtenerDeStorage(KEYS.RESERVAS);
};

/**
 * Actualiza una reserva
 * @param {number} id - ID de la reserva
 * @param {Object} reservaActualizada - Reserva actualizada
 */
export const actualizarReserva = (id, reservaActualizada) => {
  const reservas = obtenerReservas() || [];
  const index = reservas.findIndex(r => r.id === id);
  
  if (index !== -1) {
    reservas[index] = reservaActualizada;
    guardarEnStorage(KEYS.RESERVAS, reservas);
    return true;
  }
  return false;
};

/**
 * Elimina una reserva
 * @param {number} id - ID de la reserva
 * @returns {boolean} True si se eliminó
 */
export const eliminarReserva = (id) => {
  const reservas = obtenerReservas() || [];
  const reservasFiltradas = reservas.filter(r => r.id !== id);
  
  if (reservasFiltradas.length !== reservas.length) {
    guardarEnStorage(KEYS.RESERVAS, reservasFiltradas);
    return true;
  }
  return false;
};

/**
 * Obtiene una reserva por ID
 * @param {number} id - ID de la reserva
 * @returns {Object|null} Reserva encontrada
 */
export const obtenerReservaPorId = (id) => {
  const reservas = obtenerReservas() || [];
  return reservas.find(r => r.id === id) || null;
};

/**
 * Guarda un usuario con contraseña hasheada
 * @param {Object} usuario - Usuario a guardar
 */
export const guardarUsuario = (usuario) => {
  const usuarios = obtenerUsuarios() || [];
  usuarios.push(usuario);
  guardarEnStorage(KEYS.USUARIOS, usuarios);
};

/**
 * Obtiene todos los usuarios
 * @returns {Array} Array de usuarios
 */
export const obtenerUsuarios = () => {
  return obtenerDeStorage(KEYS.USUARIOS);
};

/**
 * Guarda el carrito de compras
 * @param {Array} carrito - Carrito de compras
 */
export const guardarCarrito = (carrito) => {
  guardarEnStorage(KEYS.CARRITO, carrito);
};

/**
 * Obtiene el carrito de compras
 * @returns {Array} Carrito de compras
 */
export const obtenerCarrito = () => {
  return obtenerDeStorage(KEYS.CARRITO) || [];
};

/**
 * Limpia todo el storage
 */
export const limpiarStorage = () => {
  localStorage.clear();
};

export default {
  guardarEnStorage,
  obtenerDeStorage,
  guardarReserva,
  obtenerReservas,
  actualizarReserva,
  eliminarReserva,
  obtenerReservaPorId,
  guardarUsuario,
  obtenerUsuarios,
  guardarCarrito,
  obtenerCarrito,
  limpiarStorage,
  KEYS
};