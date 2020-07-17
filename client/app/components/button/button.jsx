/* eslint-disable react/prop-types */
import React from 'react';

import './button.css';

export function Button(props) {
  const { children, className, ...rest } = props;
  let buttonClassName = 'app-button';
  className && (buttonClassName = `${buttonClassName} ${className}`);

  return (
    <button
      className={buttonClassName}
      {...rest}
    >
      {children}
    </button>
  );
}
