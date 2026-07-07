import CryptoJS from 'crypto-js';

/**
 * Genera un salt aleatorio
 * @returns {string} Salt generado
 */
export const generarSalt = () => {
  return CryptoJS.lib.WordArray.random(128/8).toString();
};

/**
 * Hashea una contraseña con salt
 * @param {string} password - Contraseña a hashear
 * @param {string} salt - Salt para el hashing
 * @returns {string} Hash generado
 */
export const hashPassword = (password, salt) => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 1000
  }).toString();
};

/**
 * Verifica si una contraseña coincide con el hash
 * @param {string} password - Contraseña a verificar
 * @param {string} salt - Salt almacenado
 * @param {string} hash - Hash almacenado
 * @returns {boolean} True si coincide
 */
export const verifyPassword = (password, salt, hash) => {
  const hashedPassword = hashPassword(password, salt);
  return hashedPassword === hash;
};

/**
 * Encripta datos sensibles con AES
 * @param {string} data - Datos a encriptar
 * @param {string} key - Clave de encriptación
 * @returns {string} Datos encriptados
 */
export const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

/**
 * Desencripta datos
 * @param {string} encryptedData - Datos encriptados
 * @param {string} key - Clave de desencriptación
 * @returns {string} Datos originales
 */
export const decryptData = (encryptedData, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default {
  generarSalt,
  hashPassword,
  verifyPassword,
  encryptData,
  decryptData
};