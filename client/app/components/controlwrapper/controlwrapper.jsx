/* eslint-disable react/prop-types */
import React from 'react';

// styles
import './controlwrapper.css';
import { browserStorage, classNameBuilder } from '../../utils/browser';

export function ControlWrapper(props) {
  const {
    id,
    label,
    toWrap,
    className,
    remember,
    value,
    ...rest
  } = props;

  const _label = label || '';
  const _id = id || `${_label.replace(/\s/g, '').toLowerCase()}-wrapper`;
  const _class = classNameBuilder({
    [className]: className
  }, 'control-wrapper');

  const _remember = remember && typeof remember === 'string' ? remember : '';
  const remembered = browserStorage.get(_remember);

  return (
    <div
      className={_class}
      {...rest}
    >
      {label && <label
        htmlFor={_id}
        className="control-wrapper__label"
        aria-label={`'${label || 'App'}' ControlWrapper label`}
      >
        {label}
      </label>}
      <div
        id={_id}
        className="control-wrapper__main"
        onBlur={() => {
          _remember && browserStorage.set(_remember, value);
        }}
      >
        {_remember
          ? toWrap(remembered)
          : toWrap
        }
      </div>
    </div>
  );
}
