/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import './input.css';

export function Input(props) {
  const {
    label,
    defaultValue,
    className,
    remember,
    onBlur,
    ...rest
  } = props;

  const _remember = remember && typeof remember === 'string' ? remember : false;
  const dValue = defaultValue || '';
  const remembered = sessionStorage.getItem(_remember);

  let inputClassName = 'app-input__textfield';
  className && (inputClassName = `${inputClassName} ${className}`);

  useEffect(() => {
    if (remembered) {
      onBlur({ target: { value: remembered } });
    }
  }, [remembered]);

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
        defaultValue={
          remembered && !dValue
            ? remembered
            : dValue
        }
        onBlur={e => {
          _remember && sessionStorage.setItem(_remember, e.target.value);
          onBlur(e);
        }}
        {...rest}
      />
    </div>
  );
}
