import React, { useState, useEffect } from 'react';
import { calcularPrecioVuelo, obtenerUF, obtenerUSD, obtenerEUR } from '../services/mindicadorAPI';import './CotizadorVuelos.css';

const CotizadorVuelos = () => {
  const [origen, setOrigen] = useState('PUQ');
  const [destino, setDestino] = useState('SCL');
  const [fecha, setFecha] = useState('');
  const [moneda, setMoneda] = useState('CLP');
  const [precioBaseUF, setPrecioBaseUF] = useState(0.15);
  const [precioCalculado, setPrecioCalculado] = useState(null);
  const [indicadores, setIndicadores] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Aeropuertos disponibles
  const aeropuertos = [
    { codigo: 'PUQ', nombre: 'Punta Arenas (PUQ)' },
    { codigo: 'SCL', nombre: 'Santiago (SCL)' },
    { codigo: 'IPC', nombre: 'Isla de Pascua (IPC)' },
    { codigo: 'ANF', nombre: 'Antofagasta (ANF)' },
    { codigo: 'CJC', nombre: 'Calama (CJC)' },
    { codigo: 'ZCO', nombre: 'Temuco (ZCO)' },
    { codigo: 'ZAL', nombre: 'Valdivia (ZAL)' },
    { codigo: 'PMC', nombre: 'Puerto Montt (PMC)' }
  ];

  const monedas = [
    { codigo: 'CLP', nombre: 'Pesos Chilenos (CLP)', simbolo: '$' },
    { codigo: 'UF', nombre: 'Unidad de Fomento (UF)', simbolo: 'UF' },
    { codigo: 'USD', nombre: 'Dólar Americano (USD)', simbolo: 'US$' },
    { codigo: 'EUR', nombre: 'Euro (EUR)', simbolo: '€' }
  ];

  // Cargar indicadores al montar el componente
  useEffect(() => {
    cargarIndicadores();
  }, []);

  const cargarIndicadores = async () => {
    try {
      setLoading(true);
      const [uf, usd, eur] = await Promise.all([
        obtenerUF(),
        obtenerUSD(),
        obtenerEUR()
      ]);
      
      setIndicadores({ uf, usd, eur });
    } catch (error) {
      setError('Error al cargar indicadores económicos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalcular = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!fecha) {
        setError('Por favor seleccione una fecha');
        return;
      }

      const resultado = await calcularPrecioVuelo(precioBaseUF, moneda);
      setPrecioCalculado(resultado);
    } catch (error) {
      setError('Error al calcular el precio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeOrigen = (e) => setOrigen(e.target.value);
  const handleChangeDestino = (e) => setDestino(e.target.value);
  const handleChangeFecha = (e) => setFecha(e.target.value);
  const handleChangeMoneda = (e) => setMoneda(e.target.value);
  const handleChangePrecioBase = (e) => setPrecioBaseUF(parseFloat(e.target.value));

  const getSimboloMoneda = (codigo) => {
    const moneda = monedas.find(m => m.codigo === codigo);
    return moneda ? moneda.simbolo : '$';
  };

  return (
    <div className="cotizador-container">
      <h2 className="text-center mb-4">Cotizador de Vuelos - Sky Airline</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Cotizar Vuelo</h5>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); handleCalcular(); }}>
                <div className="mb-3">
                  <label htmlFor="origen" className="form-label">Origen</label>
                  <select 
                    id="origen" 
                    className="form-select" 
                    value={origen} 
                    onChange={handleChangeOrigen}
                    required
                  >
                    {aeropuertos.map(a => (
                      <option key={a.codigo} value={a.codigo}>{a.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="destino" className="form-label">Destino</label>
                  <select 
                    id="destino" 
                    className="form-select" 
                    value={destino} 
                    onChange={handleChangeDestino}
                    required
                  >
                    {aeropuertos.map(a => (
                      <option key={a.codigo} value={a.codigo}>{a.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="fecha" className="form-label">Fecha de Viaje</label>
                  <input 
                    type="date" 
                    id="fecha" 
                    className="form-control" 
                    value={fecha} 
                    onChange={handleChangeFecha}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="moneda" className="form-label">Moneda</label>
                  <select 
                    id="moneda" 
                    className="form-select" 
                    value={moneda} 
                    onChange={handleChangeMoneda}
                  >
                    {monedas.map(m => (
                      <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="precioBase" className="form-label">
                    Precio Base (UF): {precioBaseUF} UF
                  </label>
                  <input 
                    type="range" 
                    id="precioBase" 
                    className="form-range" 
                    min="0.05" 
                    max="1.0" 
                    step="0.05"
                    value={precioBaseUF} 
                    onChange={handleChangePrecioBase}
                  />
                  <small className="form-text text-muted">
                    Ajuste el precio base según la distancia
                  </small>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Calculando...' : 'Calcular Precio'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {precioCalculado && (
            <div className="card mb-3">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Resultado de la Cotización</h5>
              </div>
              <div className="card-body">
                <h3 className="text-center text-primary mb-4">
                  {getSimboloMoneda(precioCalculado.moneda)} {precioCalculado.equivalencias[precioCalculado.moneda]}
                </h3>
                
                <h6 className="mb-3">Equivalencias:</h6>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    UF
                    <span className="badge bg-primary rounded-pill">{precioCalculado.equivalencias.UF}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    USD
                    <span className="badge bg-primary rounded-pill">{precioCalculado.equivalencias.USD}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    EUR
                    <span className="badge bg-primary rounded-pill">{precioCalculado.equivalencias.EUR}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CLP
                    <span className="badge bg-primary rounded-pill">{precioCalculado.equivalencias.CLP}</span>
                  </li>
                </ul>

                <div className="mt-3">
                  <small className="text-muted">
                    Ruta: {origen} → {destino}<br/>
                    Fecha: {new Date(fecha).toLocaleDateString('es-CL')}
                  </small>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Indicadores del Día</h5>
            </div>
            <div className="card-body">
              {loading && !precioCalculado ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    UF
                    <span className="badge bg-success rounded-pill">
                      ${indicadores.uf?.toLocaleString('es-CL') || 'Cargando...'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Dólar
                    <span className="badge bg-success rounded-pill">
                      ${indicadores.usd?.toLocaleString('es-CL') || 'Cargando...'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Euro
                    <span className="badge bg-success rounded-pill">
                      ${indicadores.eur?.toLocaleString('es-CL') || 'Cargando...'}
                    </span>
                  </li>
                </ul>
              )}
              <button 
                className="btn btn-sm btn-outline-primary mt-3 w-100"
                onClick={cargarIndicadores}
                disabled={loading}
              >
                Actualizar Indicadores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizadorVuelos;