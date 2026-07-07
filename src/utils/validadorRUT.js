/**
 * Limpia el RUT eliminando puntos y guión
 * @param {string} rut - RUT a limpiar
 * @returns {string} RUT limpio
 */
export const limpiarRUT = (rut) => {
  return rut.replace(/\./g, '').replace('-', '');
};

/**
 * Calcula el dígito verificador
 * @param {string} rut - RUT sin dígito verificador
 * @returns {string} Dígito verificador
 */
export const calcularDigitoVerificador = (rut) => {
  let suma = 0;
  let multiplo = 2;
  
  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  
  const dv = 11 - (suma % 11);
  
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
};

/**
 * Valida un RUT chileno
 * @param {string} rut - RUT a validar
 * @returns {boolean} True si es válido
 */
export const validarRUT = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  
  const rutLimpio = limpiarRUT(rut);
  
  if (rutLimpio.length < 8) return false;
  
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();
  
  if (!/^\d+$/.test(cuerpo)) return false;
  
  const dvCalculado = calcularDigitoVerificador(cuerpo);
  
  return dv === dvCalculado;
};

/**
 * Formatea el RUT con puntos y guión
 * @param {string} rut - RUT a formatear
 * @returns {string} RUT formateado
 */
export const formatearRUT = (rut) => {
  const rutLimpio = limpiarRUT(rut);
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  let rutFormateado = cuerpo;
  let i = 3;
  while (i < rutFormateado.length) {
    rutFormateado = rutFormateado.slice(0, -i) + '.' + rutFormateado.slice(-i);
    i += 4;
  }
  
  return rutFormateado + '-' + dv;
};

export default {
  limpiarRUT,
  calcularDigitoVerificador,
  validarRUT,
  formatearRUT
};