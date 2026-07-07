import { cifrar, descifrar } from '../utils/encriptador';
import { 
  guardarReserva, 
  obtenerReservas, 
  actualizarReserva, 
  eliminarReserva,
  obtenerReservaPorId 
} from '../services/StorageService';

class Reserva {
  constructor(id, pasajero, vuelo, fechaReserva, estado, precioFinal, moneda) {
    this._id = id;
    this._pasajero = pasajero;
    this._vuelo = vuelo;
    this._fechaReserva = new Date(fechaReserva);
    this._estado = estado; // 'pendiente', 'confirmada', 'cancelada'
    this._precioFinal = precioFinal;
    this._moneda = moneda;
  }

  // Getters
  getId() { return this._id; }
  getPasajero() { return this._pasajero; }
  getVuelo() { return this._vuelo; }
  getFechaReserva() { return this._fechaReserva; }
  getEstado() { return this._estado; }
  getPrecioFinal() { return this._precioFinal; }
  getMoneda() { return this._moneda; }

  // Setters
  setId(id) { this._id = id; }
  setPasajero(pasajero) { this._pasajero = pasajero; }
  setVuelo(vuelo) { this._vuelo = vuelo; }
  setFechaReserva(fecha) { this._fechaReserva = new Date(fecha); }
  setEstado(estado) { this._estado = estado; }
  setPrecioFinal(precio) { this._precioFinal = precio; }
  setMoneda(moneda) { this._moneda = moneda; }

  // CRUD - CREATE
  async crear() {
    try {
      const reservaData = {
        id: this._id,
        pasajero: this._pasajero.cifrar(),
        vuelo: this._vuelo.cifrar(),
        fechaReserva: this._fechaReserva.toISOString(),
        estado: this._estado,
        precioFinal: this._precioFinal,
        moneda: this._moneda
      };
      guardarReserva(reservaData);
      return true;
    } catch (error) {
      console.error('Error al crear reserva:', error);
      return false;
    }
  }

  // CRUD - READ
  static leer(id) {
    try {
      const reservaData = obtenerReservaPorId(id);
      if (!reservaData) return null;

      const reserva = new Reserva(
        reservaData.id,
        null, // Se desencriptará después
        null,
        reservaData.fechaReserva,
        reservaData.estado,
        reservaData.precioFinal,
        reservaData.moneda
      );

      // Desencriptar pasajero y vuelo
      const pasajeroEncriptado = JSON.parse(descifrar(reservaData.pasajero));
      const vueloEncriptado = JSON.parse(descifrar(reservaData.vuelo));
      
      // Aquí deberías importar las clases Pasajero y Vuelo
      // reserva._pasajero = Pasajero.fromObject(pasajeroEncriptado);
      // reserva._vuelo = Vuelo.fromObject(vueloEncriptado);

      return reserva;
    } catch (error) {
      console.error('Error al leer reserva:', error);
      return null;
    }
  }

  // CRUD - UPDATE
  async actualizar() {
    try {
      const reservaData = {
        id: this._id,
        pasajero: this._pasajero.cifrar(),
        vuelo: this._vuelo.cifrar(),
        fechaReserva: this._fechaReserva.toISOString(),
        estado: this._estado,
        precioFinal: this._precioFinal,
        moneda: this._moneda
      };
      return actualizarReserva(this._id, reservaData);
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
      return false;
    }
  }

  // CRUD - DELETE
  static eliminar(id) {
    return eliminarReserva(id);
  }

  // CRUD - LIST ALL
  static listarTodas() {
    try {
      const reservasData = obtenerReservas() || [];
      return reservasData.map(data => {
        const reserva = new Reserva(
          data.id,
          null,
          null,
          data.fechaReserva,
          data.estado,
          data.precioFinal,
          data.moneda
        );
        return reserva;
      });
    } catch (error) {
      console.error('Error al listar reservas:', error);
      return [];
    }
  }

  // Métodos de encriptación
  cifrar() {
    return {
      id: cifrar(String(this._id)),
      pasajero: this._pasajero.cifrar(),
      vuelo: this._vuelo.cifrar(),
      fechaReserva: cifrar(this._fechaReserva.toISOString()),
      estado: cifrar(this._estado),
      precioFinal: cifrar(String(this._precioFinal)),
      moneda: cifrar(this._moneda)
    };
  }

  descifrar(datosEncriptados) {
    this._id = parseInt(descifrar(datosEncriptados.id));
    this._fechaReserva = new Date(descifrar(datosEncriptados.fechaReserva));
    this._estado = descifrar(datosEncriptados.estado);
    this._precioFinal = parseFloat(descifrar(datosEncriptados.precioFinal));
    this._moneda = descifrar(datosEncriptados.moneda);
  }

  // Método estático
  static fromObject(obj) {
    return new Reserva(
      obj.id,
      obj.pasajero,
      obj.vuelo,
      obj.fechaReserva,
      obj.estado,
      obj.precioFinal,
      obj.moneda
    );
  }
}

export default Reserva;