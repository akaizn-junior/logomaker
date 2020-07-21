/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import './keywords.css';
import { safeFun } from '../../utils/browser';

export function Keywords(props) {
  const {
    label,
    onKeyDown,
    className,
    remember,
    defaultValue,
    onBlur,
    ...rest
  } = props;

  const [keywords, setKeywords] = useState([]);

  const _onKeyDown = safeFun(onKeyDown);
  const _onBlur = safeFun(onBlur);

  const _remember = remember && typeof remember === 'string' ? remember : '';
  const dValue = defaultValue || '';
  const remembered = sessionStorage.getItem(_remember);

  let textClassName = 'app-keywords__textfield';
  className && (textClassName = `${textClassName} ${className}`);

  useEffect(() => {
    if (remembered) {
      onBlur({ target: { value: remembered } });
    }
  }, [remembered]);

  useEffect(() => {
    console.log(keywords);
  }, [keywords]);

  return (
    <div
      className="app-keywords"
      aria-label={`'${label || 'App'}' keywords`}
    >
      {label && <label
        className="app-keywords__label"
        aria-label={`'${label || 'App'}' input label`}
      >
        {label}
      </label>}
      <div
        contentEditable="true"
        className={textClassName}
        onBlur={e => {
          const value = e.target.innerText;
          _remember && sessionStorage.setItem(_remember, value);
          _onBlur({ target: { value } });
        }}
        onKeyDown={e => {
          let value = e.target.innerText.replace(/\s/g, '');

          value = value.split(',').map(v =>
            `<span class="app-keywords__keyword">${v}</span>`
          );

          if (e.key === ',') {
            setKeywords(keywords.concat(value));
          }

          _onKeyDown(e);
        }}
        dangerouslySetInnerHTML={{
          __html:
            keywords
              ? keywords
              : remembered && !dValue
                ? remembered
                : dValue
        }}
        {...rest}
      >
      </div>
    </div>
  );
}
