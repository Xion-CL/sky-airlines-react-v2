import React from 'react';

const SelectMoneda = ({ value, onChange, label = 'Moneda' }) => {
  const monedas = [
    { codigo: 'CLP', nombre: 'Pesos Chilenos (CLP)', simbolo: '$' },
    { codigo: 'UF', nombre: 'Unidad de Fomento (UF)', simbolo: 'UF' },
    { codigo: 'USD', nombre: 'Dólar Americano (USD)', simbolo: 'US$' },
    { codigo: 'EUR', nombre: 'Euro (EUR)', simbolo: '€' }
  ];

  return (
    <div className="mb-3">
      <label htmlFor="moneda" className="form-label">{label}</label>
      <select
        id="moneda"
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {monedas.map(m => (
          <option key={m.codigo} value={m.codigo}>
            {m.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMoneda;