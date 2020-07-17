/* eslint-disable react/prop-types */
import React from 'react';

import './input.css';

export function Input(props) {
  const { label, className, ...rest } = props;
  let inputClassName = 'app-input__textfield';
  className && (inputClassName = `${inputClassName} ${className}`);

  return (
    <div
      className="app-input"
      aria-label={`'${label || 'App'}' input`}
    >
      {label && <label
        className="app-input__label"
        aria-label={`'${label || 'App'}' input label`}
      >
        {label}
      </label>}
      <input
        className={inputClassName}
        {...rest}
      />
    </div>
  );
}
