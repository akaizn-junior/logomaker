/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// styles
import './palette.css';
import { safeFun } from '../../utils/browser';

export function ColorPalette(props) {
  const {
    label,
    id,
    name,
    remember,
    onBlur,
    onInput,
    defaultValue,
    ...rest
  } = props;

  const _onBlur = safeFun(onBlur);
  const _onInput = safeFun(onInput);
  const _remember = remember && typeof remember === 'string' ? remember : '';
  const selectId = `palette-colors-select${name || id}`;
  const dValue = defaultValue || '';
  const remembered = sessionStorage.getItem(_remember);

  const validValue = v => v.replace(/;/g, '').trim();

  const [color, setColor] = useState(
    remembered
      ? remembered
      : dValue
        ? dValue
        : '#000000'
  );

  useEffect(() => {
    if (remembered) {
      onBlur({ target: { value: remembered } });
    }
  }, [remembered]);

  return (
    <div
      className="palette"
      {...rest}
    >
      {label && <label
        className="palette__label"
        aria-label={`'${label || 'App'}' palette label`}
      >
        {label}
      </label>}
      <div className="palette__main">
        <input
          id={selectId}
          className="palette-colors-select"
          type="color"
          onInput={e => {
            _remember && sessionStorage.setItem(_remember, validValue(e.target.value));
            setColor(validValue(e.target.value));
            _onInput(validValue(e.target.value));
          }}
        />
        <div
          tabIndex={0}
          className="palette__colors"
          style={{ background: `${color}` }}
          onClick={() => {
            const select = document.getElementById(selectId);
            select && select.click();
          }}
        >
        </div>
        <input
          id={id}
          name={name}
          onBlur={e => {
            _remember && sessionStorage.setItem(_remember, validValue(e.target.value));
            _onBlur(validValue(e.target.value));
          }}
          type="text"
          className="palette__color-value"
          value={color}
          onChange={e => {
            _onInput(validValue(e.target.value));
            setColor(validValue(e.target.value));
          }}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck={(() => color.startsWith('#') && 'false' || 'true')()}
        />
      </div>
    </div>
  );
}
