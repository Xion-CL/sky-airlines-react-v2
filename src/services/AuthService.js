import { verifyPassword } from '../utils/hashing';
import { obtenerUsuarios } from './StorageService';

/**
 * Autentica un usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Object|null} Usuario autenticado o null
 */
export const autenticarUsuario = (email, password) => {
  const usuarios = obtenerUsuarios() || [];
  
  const usuario = usuarios.find(u => u.email === email);
  
  if (!usuario) {
    return null;
  }

  const passwordValido = verifyPassword(password, usuario.salt, usuario.password);
  
  if (!passwordValido) {
    return null;
  }

  // No retornar la contraseña
  const { password: _, salt: __, ...usuarioSinCredenciales } = usuario;
  return usuarioSinCredenciales;
};

/**
 * Verifica si existe un usuario con ese email
 * @param {string} email - Email a verificar
 * @returns {boolean}
 */
export const existeEmail = (email) => {
  const usuarios = obtenerUsuarios() || [];
  return usuarios.some(u => u.email === email);
};

export default {
  autenticarUsuario,
  existeEmail
};