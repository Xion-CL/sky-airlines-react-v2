import CryptoJS from 'crypto-js';

const CLAVE_ENCRIPTACION = 'SkyAirlines2026SecretKey';

/**
 * Encripta un texto usando Base64 + AES
 * @param {string} texto - Texto a encriptar
 * @returns {string} Texto encriptado
 */
export const cifrar = (texto) => {
  if (!texto) return '';
  const encriptado = CryptoJS.AES.encrypt(texto, CLAVE_ENCRIPTACION);
  return encriptado.toString();
};

/**
 * Desencripta un texto
 * @param {string} textoEncriptado - Texto encriptado
 * @returns {string} Texto original
 */
export const descifrar = (textoEncriptado) => {
  if (!textoEncriptado) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(textoEncriptado, CLAVE_ENCRIPTACION);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error al desencriptar:', error);
    return '';
  }
};

/**
 * Encripta un objeto completo
 * @param {Object} obj - Objeto a encriptar
 * @returns {Object} Objeto encriptado
 */
export const cifrarObjeto = (obj) => {
  const objEncriptado = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objEncriptado[key] = cifrar(String(obj[key]));
    }
  }
  return objEncriptado;
};

/**
 * Desencripta un objeto completo
 * @param {Object} obj - Objeto encriptado
 * @returns {Object} Objeto original
 */
export const descifrarObjeto = (obj) => {
  const objDesencriptado = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objDesencriptado[key] = descifrar(obj[key]);
    }
  }
  return objDesencriptado;
};

export default {
  cifrar,
  descifrar,
  cifrarObjeto,
  descifrarObjeto
};