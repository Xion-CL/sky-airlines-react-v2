import { cifrar, descifrar } from '../utils/encriptador';

class Usuario {
  constructor(id, nombre, email, rut, password, salt) {
    this._id = id;
    this._nombre = nombre;
    this._email = email;
    this._rut = rut;
    this._password = password;
    this._salt = salt;
    this._fechaRegistro = new Date();
  }

  // Getters
  getId() { return this._id; }
  getNombre() { return this._nombre; }
  getEmail() { return this._email; }
  getRut() { return this._rut; }
  getPassword() { return this._password; }
  getSalt() { return this._salt; }
  getFechaRegistro() { return this._fechaRegistro; }

  // Setters
  setNombre(nombre) { this._nombre = nombre; }
  setEmail(email) { this._email = email; }
  setRut(rut) { this._rut = rut; }
  setPassword(password) { this._password = password; }
  setSalt(salt) { this._salt = salt; }

  // Métodos de encriptación
  cifrar() {
    return {
      id: cifrar(String(this._id)),
      nombre: cifrar(this._nombre),
      email: cifrar(this._email),
      rut: cifrar(this._rut),
      password: cifrar(this._password),
      salt: cifrar(this._salt),
      fechaRegistro: cifrar(this._fechaRegistro.toISOString())
    };
  }

  descifrar(datosEncriptados) {
    this._id = parseInt(descifrar(datosEncriptados.id));
    this._nombre = descifrar(datosEncriptados.nombre);
    this._email = descifrar(datosEncriptados.email);
    this._rut = descifrar(datosEncriptados.rut);
    this._password = descifrar(datosEncriptados.password);
    this._salt = descifrar(datosEncriptados.salt);
    this._fechaRegistro = new Date(descifrar(datosEncriptados.fechaRegistro));
  }

  // Método estático
  static fromObject(obj) {
    return new Usuario(
      obj.id,
      obj.nombre,
      obj.email,
      obj.rut,
      obj.password,
      obj.salt
    );
  }
}

export default Usuario;