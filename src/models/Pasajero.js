import { validarRUT } from '../utils/validadorRUT';
import { calcularEdad } from '../utils/calculadoraEdad';
import { cifrar, descifrar } from '../utils/encriptador';

class Pasajero {
  constructor(rut, nombre, apellido, fechaNacimiento, email, telefono, pasaporte) {
    this._rut = rut;
    this._nombre = nombre;
    this._apellido = apellido;
    this._fechaNacimiento = new Date(fechaNacimiento);
    this._email = email;
    this._telefono = telefono;
    this._pasaporte = pasaporte;
    this._edad = calcularEdad(this._fechaNacimiento);
  }

  // Getters
  getRut() { return this._rut; }
  getNombre() { return this._nombre; }
  getApellido() { return this._apellido; }
  getFechaNacimiento() { return this._fechaNacimiento; }
  getEmail() { return this._email; }
  getTelefono() { return this._telefono; }
  getPasaporte() { return this._pasaporte; }
  getEdad() { return this._edad; }

  // Setters
  setRut(rut) { 
    this._rut = rut;
    this._edad = calcularEdad(this._fechaNacimiento);
  }
  setNombre(nombre) { this._nombre = nombre; }
  setApellido(apellido) { this._apellido = apellido; }
  setFechaNacimiento(fecha) { 
    this._fechaNacimiento = new Date(fecha);
    this._edad = calcularEdad(this._fechaNacimiento);
  }
  setEmail(email) { this._email = email; }
  setTelefono(telefono) { this._telefono = telefono; }
  setPasaporte(pasaporte) { this._pasaporte = pasaporte; }

  // Métodos de validación
  validarRUT() {
    return validarRUT(this._rut);
  }

  validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this._email);
  }

  validarTelefono() {
    const telefonoRegex = /^\+?[\d\s-]{8,}$/;
    return telefonoRegex.test(this._telefono);
  }

  validar() {
    return this.validarRUT() && this.validarEmail() && this.validarTelefono();
  }

  // Métodos de encriptación
  cifrar() {
    return {
      rut: cifrar(this._rut),
      nombre: cifrar(this._nombre),
      apellido: cifrar(this._apellido),
      fechaNacimiento: cifrar(this._fechaNacimiento.toISOString()),
      email: cifrar(this._email),
      telefono: cifrar(this._telefono),
      pasaporte: cifrar(this._pasaporte)
    };
  }

  descifrar(datosEncriptados) {
    this._rut = descifrar(datosEncriptados.rut);
    this._nombre = descifrar(datosEncriptados.nombre);
    this._apellido = descifrar(datosEncriptados.apellido);
    this._fechaNacimiento = new Date(descifrar(datosEncriptados.fechaNacimiento));
    this._email = descifrar(datosEncriptados.email);
    this._telefono = descifrar(datosEncriptados.telefono);
    this._pasaporte = descifrar(datosEncriptados.pasaporte);
    this._edad = calcularEdad(this._fechaNacimiento);
  }

  // Método estático para crear desde objeto
  static fromObject(obj) {
    return new Pasajero(
      obj.rut,
      obj.nombre,
      obj.apellido,
      obj.fechaNacimiento,
      obj.email,
      obj.telefono,
      obj.pasaporte
    );
  }
}

export default Pasajero;