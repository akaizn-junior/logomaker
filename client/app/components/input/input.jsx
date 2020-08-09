/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import './input.css';
import { safeFun, browserStorage, classNameBuilder } from '../../utils/browser';

export function Input(props) {
  const {
    label,
    defaultValue,
    className,
    remember,
    onBlur,
    ...rest
  } = props;

  const _onBlur = safeFun(onBlur);
  const _class = classNameBuilder({
    [className]: className
  }, 'app-input__textfield');
  const _remember = remember && typeof remember === 'string' ? remember : '';

  const dValue = defaultValue || '';
  const remembered = browserStorage.get(_remember);

  useEffect(() => {
    if (remembered) {
      _onBlur({ target: { value: remembered } });
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
        className={_class}
        defaultValue={
          remembered
            ? remembered
            : dValue
        }
        onBlur={e => {
          _remember && browserStorage.set(_remember, e.target.value);
          _onBlur(e);
        }}
        {...rest}
      />
    </div>
  );
}
