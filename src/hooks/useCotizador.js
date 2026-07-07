import { useState, useEffect } from 'react';
import { calcularPrecioVuelo, obtenerUF, obtenerUSD, obtenerEUR } from '../services/mindicadorAPI';

export const useCotizador = () => {
  const [indicadores, setIndicadores] = useState({
    uf: null,
    usd: null,
    eur: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarIndicadores = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [uf, usd, eur] = await Promise.all([
        obtenerUF(),
        obtenerUSD(),
        obtenerEUR()
      ]);

      setIndicadores({ uf, usd, eur });
    } catch (err) {
      setError('Error al cargar indicadores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calcularPrecio = async (precioBaseUF, moneda = 'CLP') => {
    try {
      setLoading(true);
      const resultado = await calcularPrecioVuelo(precioBaseUF, moneda);
      return resultado;
    } catch (err) {
      setError('Error al calcular precio');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarIndicadores();
  }, []);

  return {
    indicadores,
    loading,
    error,
    calcularPrecio,
    recargar: cargarIndicadores
  };
};

export default useCotizador;