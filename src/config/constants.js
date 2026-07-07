export const CONFIG = {
  // API
  API_BASE_URL: 'https://www.mindicador.cl/api',
  
  // Almacenamiento
  STORAGE_KEYS: {
    RESERVAS: 'sky_airlines_reservas',
    USUARIOS: 'sky_airlines_usuarios',
    CARRITO: 'sky_airlines_carrito',
    SESSION: 'sky_airlines_session'
  },
  
  // Aeropuertos
  AEROPUERTOS: [
    { codigo: 'PUQ', nombre: 'Punta Arenas', ciudad: 'Punta Arenas' },
    { codigo: 'SCL', nombre: 'Santiago', ciudad: 'Santiago' },
    { codigo: 'IPC', nombre: 'Isla de Pascua', ciudad: 'Hanga Roa' },
    { codigo: 'ANF', nombre: 'Antofagasta', ciudad: 'Antofagasta' },
    { codigo: 'CJC', nombre: 'Calama', ciudad: 'Calama' },
    { codigo: 'ZCO', nombre: 'Temuco', ciudad: 'Temuco' },
    { codigo: 'ZAL', nombre: 'Valdivia', ciudad: 'Valdivia' },
    { codigo: 'PMC', nombre: 'Puerto Montt', ciudad: 'Puerto Montt' }
  ],
  
  // Monedas
  MONEDAS: [
    { codigo: 'CLP', nombre: 'Peso Chileno', simbolo: '$' },
    { codigo: 'UF', nombre: 'Unidad de Fomento', simbolo: 'UF' },
    { codigo: 'USD', nombre: 'Dólar Americano', simbolo: 'US$' },
    { codigo: 'EUR', nombre: 'Euro', simbolo: '€' }
  ],
  
  // Validaciones
  VALIDACIONES: {
    RUT_MIN_LENGTH: 8,
    PASSWORD_MIN_LENGTH: 6,
    EDAD_MINIMA: 18
  },
  
  // Precios base en UF
  PRECIOS_BASE: {
    CORTA_DISTANCIA: 0.10,
    MEDIA_DISTANCIA: 0.15,
    LARGA_DISTANCIA: 0.25
  }
};

export default CONFIG;