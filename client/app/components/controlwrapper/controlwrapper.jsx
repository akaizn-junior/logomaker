/* eslint-disable react/prop-types */
import React from 'react';

// styles
import './controlwrapper.css';

export function ControlWrapper(props) {
  const {
    id,
    label,
    toWrap,
    ...rest
  } = props;

  const _label = label || '';
  const _id = id || `${_label.replace(/\s/g, '').toLowerCase()}-wrapper`;

  return (
    <div
      className="control-wrapper"
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
      >
        {toWrap}
      </div>
    </div>
  );
}
