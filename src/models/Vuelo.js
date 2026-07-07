import { calcularPrecioVuelo } from '../services/mindicadorAPI';
import { cifrar, descifrar } from '../utils/encriptador';

class Vuelo {
  constructor(id, origen, destino, fecha, precioBaseUF, asientosDisponibles, aerolinea = 'Sky Airline') {
    this._id = id;
    this._origen = origen;
    this._destino = destino;
    this._fecha = new Date(fecha);
    this._precioBaseUF = precioBaseUF;
    this._asientosDisponibles = asientosDisponibles;
    this._aerolinea = aerolinea;
  }

  // Getters
  getId() { return this._id; }
  getOrigen() { return this._origen; }
  getDestino() { return this._destino; }
  getFecha() { return this._fecha; }
  getPrecioBaseUF() { return this._precioBaseUF; }
  getAsientosDisponibles() { return this._asientosDisponibles; }
  getAerolinea() { return this._aerolinea; }

  // Setters
  setId(id) { this._id = id; }
  setOrigen(origen) { this._origen = origen; }
  setDestino(destino) { this._destino = destino; }
  setFecha(fecha) { this._fecha = new Date(fecha); }
  setPrecioBaseUF(precio) { this._precioBaseUF = precio; }
  setAsientosDisponibles(asientos) { this._asientosDisponibles = asientos; }
  setAerolinea(aerolinea) { this._aerolinea = aerolinea; }

  // Métodos de cotización
  async obtenerPrecioCLP() {
    const resultado = await calcularPrecioVuelo(this._precioBaseUF, 'CLP');
    return resultado.valor;
  }

  async obtenerPrecioUF() {
    return this._precioBaseUF;
  }

  async obtenerPrecioUSD() {
    const resultado = await calcularPrecioVuelo(this._precioBaseUF, 'USD');
    return resultado.valor;
  }

  async obtenerPrecioEUR() {
    const resultado = await calcularPrecioVuelo(this._precioBaseUF, 'EUR');
    return resultado.valor;
  }

  async obtenerPreciosCompletos() {
    return await calcularPrecioVuelo(this._precioBaseUF, 'CLP');
  }

  // Métodos de encriptación
  cifrar() {
    return {
      id: cifrar(String(this._id)),
      origen: cifrar(this._origen),
      destino: cifrar(this._destino),
      fecha: cifrar(this._fecha.toISOString()),
      precioBaseUF: cifrar(String(this._precioBaseUF)),
      asientosDisponibles: cifrar(String(this._asientosDisponibles)),
      aerolinea: cifrar(this._aerolinea)
    };
  }

  descifrar(datosEncriptados) {
    this._id = parseInt(descifrar(datosEncriptados.id));
    this._origen = descifrar(datosEncriptados.origen);
    this._destino = descifrar(datosEncriptados.destino);
    this._fecha = new Date(descifrar(datosEncriptados.fecha));
    this._precioBaseUF = parseFloat(descifrar(datosEncriptados.precioBaseUF));
    this._asientosDisponibles = parseInt(descifrar(datosEncriptados.asientosDisponibles));
    this._aerolinea = descifrar(datosEncriptados.aerolinea);
  }

  // Método estático
  static fromObject(obj) {
    return new Vuelo(
      obj.id,
      obj.origen,
      obj.destino,
      obj.fecha,
      obj.precioBaseUF,
      obj.asientosDisponibles,
      obj.aerolinea
    );
  }
}

export default Vuelo;