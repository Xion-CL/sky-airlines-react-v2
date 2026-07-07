/**
 * Formatea un número como moneda chilena
 * @param {number} valor - Valor a formatear
 * @returns {string} Valor formateado
 */
export const formatearMoneda = (valor, moneda = 'CLP') => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: moneda === 'CLP' ? 'CLP' : moneda
  }).format(valor);
};

/**
 * Formatea una fecha
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Genera un ID único
 * @returns {number} ID único
 */
export const generarId = () => {
  return Date.now();
};

/**
 * Valida que un campo no esté vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean}
 */
export const validarCampoRequerido = (valor) => {
  return valor && valor.trim().length > 0;
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} texto - Texto a capitalizar
 * @returns {string}
 */
export const capitalizar = (texto) => {
  return texto
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ');
};

export default {
  formatearMoneda,
  formatearFecha,
  generarId,
  validarCampoRequerido,
  capitalizar
};