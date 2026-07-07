/**
 * Calcula la edad a partir de la fecha de nacimiento
 * @param {Date} fechaNacimiento - Fecha de nacimiento
 * @returns {number} Edad en años
 */
export const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();
  
  if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
};

/**
 * Verifica si es mayor de edad
 * @param {Date} fechaNacimiento - Fecha de nacimiento
 * @returns {boolean} True si es mayor de 18 años
 */
export const esMayorDeEdad = (fechaNacimiento) => {
  const edad = calcularEdad(fechaNacimiento);
  return edad >= 18;
};

/**
 * Calcula días hasta el próximo cumpleaños
 * @param {Date} fechaNacimiento - Fecha de nacimiento
 * @returns {number} Días restantes
 */
export const calcularDiasHastaCumpleanos = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  let proximoCumpleanos = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  
  if (proximoCumpleanos < hoy) {
    proximoCumpleanos.setFullYear(hoy.getFullYear() + 1);
  }
  
  const diferencia = proximoCumpleanos - hoy;
  const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  
  return dias;
};

export default {
  calcularEdad,
  esMayorDeEdad,
  calcularDiasHastaCumpleanos
};