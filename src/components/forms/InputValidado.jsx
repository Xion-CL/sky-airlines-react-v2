import React from 'react';

const InputValidado = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = '',
  name 
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputValidado;