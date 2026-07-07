const API_BASE_URL = 'https://www.mindicador.cl/api';

/**
 * Obtiene todos los indicadores económicos
 * @returns {Promise<Object>} Indicadores económicos
 */
export const obtenerIndicadores = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Error al obtener indicadores');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en API mindicador:', error);
    throw error;
  }
};

/**
 * Obtiene el valor de la UF
 * @returns {Promise<number>} Valor de la UF
 */
export const obtenerUF = async () => {
  try {
    const data = await obtenerIndicadores();
    return parseFloat(data.uf.valor);
  } catch (error) {
    console.error('Error al obtener UF:', error);
    throw error;
  }
};

/**
 * Obtiene el valor del Dólar
 * @returns {Promise<number>} Valor del Dólar
 */
export const obtenerUSD = async () => {
  try {
    const data = await obtenerIndicadores();
    return parseFloat(data.dolar.valor);
  } catch (error) {
    console.error('Error al obtener USD:', error);
    throw error;
  }
};

/**
 * Obtiene el valor del Euro
 * @returns {Promise<number>} Valor del Euro
 */
export const obtenerEUR = async () => {
  try {
    const data = await obtenerIndicadores();
    return parseFloat(data.euro.valor);
  } catch (error) {
    console.error('Error al obtener EUR:', error);
    throw error;
  }
};

/**
 * Obtiene el valor de la UTM
 * @returns {Promise<number>} Valor de la UTM
 */
export const obtenerUTM = async () => {
  try {
    const data = await obtenerIndicadores();
    return parseFloat(data.utm.valor);
  } catch (error) {
    console.error('Error al obtener UTM:', error);
    throw error;
  }
};

/**
 * Calcula el precio de un vuelo en diferentes monedas
 * @param {number} precioBaseUF - Precio base en UF
 * @param {string} moneda - Moneda destino (CLP, USD, EUR, UF)
 * @returns {Promise<Object>} Precios calculados
 */
export const calcularPrecioVuelo = async (precioBaseUF, moneda = 'CLP') => {
  try {
    const [uf, usd, eur] = await Promise.all([
      obtenerUF(),
      obtenerUSD(),
      obtenerEUR()
    ]);

    const precioCLP = precioBaseUF * uf;
    const precioUSD = precioCLP / usd;
    const precioEUR = precioCLP / eur;
    const precioUF = precioBaseUF;

    switch (moneda.toUpperCase()) {
      case 'CLP':
        return {
          valor: precioCLP,
          moneda: 'CLP',
          equivalencias: {
            UF: precioUF.toFixed(4),
            USD: precioUSD.toFixed(2),
            EUR: precioEUR.toFixed(2),
            CLP: precioCLP.toLocaleString('es-CL')
          }
        };
      case 'USD':
        return {
          valor: precioUSD,
          moneda: 'USD',
          equivalencias: {
            UF: precioUF.toFixed(4),
            USD: precioUSD.toFixed(2),
            EUR: precioEUR.toFixed(2),
            CLP: precioCLP.toLocaleString('es-CL')
          }
        };
      case 'EUR':
        return {
          valor: precioEUR,
          moneda: 'EUR',
          equivalencias: {
            UF: precioUF.toFixed(4),
            USD: precioUSD.toFixed(2),
            EUR: precioEUR.toFixed(2),
            CLP: precioCLP.toLocaleString('es-CL')
          }
        };
      case 'UF':
        return {
          valor: precioUF,
          moneda: 'UF',
          equivalencias: {
            UF: precioUF.toFixed(4),
            USD: precioUSD.toFixed(2),
            EUR: precioEUR.toFixed(2),
            CLP: precioCLP.toLocaleString('es-CL')
          }
        };
      default:
        return {
          valor: precioCLP,
          moneda: 'CLP',
          equivalencias: {
            UF: precioUF.toFixed(4),
            USD: precioUSD.toFixed(2),
            EUR: precioEUR.toFixed(2),
            CLP: precioCLP.toLocaleString('es-CL')
          }
        };
    }
  } catch (error) {
    console.error('Error al calcular precio:', error);
    throw error;
  }
};

export default {
  obtenerIndicadores,
  obtenerUF,
  obtenerUSD,
  obtenerEUR,
  obtenerUTM,
  calcularPrecioVuelo
};