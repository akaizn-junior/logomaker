/* eslint-disable react/prop-types */
import React from 'react';

import './button.css';
import { classNameBuilder } from '../../utils/browser';

export function Button(props) {
  const {
    children,
    theme,
    className,
    active,
    ...rest
  } = props;

  const buttonClassName = classNameBuilder({
    'app-button--active': active,
    'app-button--light': theme === 'light',
    [className]: className
  }, 'app-button');

  return (
    <button
      className={buttonClassName}
      {...rest}
    >
      {children}
    </button>
  );
}
