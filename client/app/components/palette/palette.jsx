/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// styles
import './palette.css';
import { safeFun, browserStorage, classNameBuilder } from '../../utils/browser';

import {
  stripSemiColonFromValue,
  getContrastRatio
} from './palette.helper';

export function ColorPalette(props) {
  const {
    label,
    id,
    name,
    remember,
    onInput,
    defaultValue,
    className,
    showColorContrast,
    colorContrastTrigger,
    ...rest
  } = props;

  const _onInput = safeFun(onInput);
  const _class = classNameBuilder({[className]: className}, 'palette');
  const _remember = remember && typeof remember === 'string' ? remember : '';

  const selectId = `palette-colors-select${name || id}`;
  const dValue = defaultValue || '';
  const remembered = browserStorage.get(_remember);

  const [contrastRatio, setContrastRatio] = useState(null);

  const [color, setColor] = useState(
    remembered
      ? remembered
      : dValue
        ? dValue
        : '#000000'
  );

  useEffect(() => {
    setContrastRatio(null);
  }, [colorContrastTrigger]);

  useEffect(() => {
    if (!contrastRatio) {
      showColorContrast && getContrastRatio(
        showColorContrast.fg,
        showColorContrast.bg,
        showColorContrast.size,
        showColorContrast.weight,
        setContrastRatio
      );
    }
  }, [contrastRatio]);

  return (
    <div
      className={_class}
      title={color}
      {...rest}
    >
      {label && <label
        className="palette__label"
        aria-label={`'${label || 'App'}' palette label`}
      >
        {label}
      </label>
      }
      <div className="palette__main">
        <input
          id={selectId}
          className="palette-colors-select"
          type="color"
          defaultValue={color}
          onInput={e => {
            setColor(stripSemiColonFromValue(e.target.value));
            _onInput(stripSemiColonFromValue(e.target.value));
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
          data-value={color}
          onBlur={e => {
            const value = e.target.dataset.value;
            _remember && browserStorage.set(_remember, stripSemiColonFromValue(value));
            setContrastRatio(null);
          }}
        >
        </div>
        <input
          id={id}
          name={name}
          onBlur={e => {
            _remember && browserStorage.set(_remember, stripSemiColonFromValue(e.target.value));
            setContrastRatio(null);
          }}
          type="text"
          className="palette__color-value"
          value={color}
          onChange={e => {
            _onInput(stripSemiColonFromValue(e.target.value));
            setColor(stripSemiColonFromValue(e.target.value));
          }}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
        {showColorContrast && contrastRatio && !contrastRatio.error
          && <div
            className="palette__color-contrast"
            title="Color contrast"
          >
            <span
              style={{
                background: showColorContrast.bg,
                color: showColorContrast.fg
              }}
            >Aa</span>
            <span>{contrastRatio.ratio}:1</span>
            <span
              className={
                contrastRatio.AAA || contrastRatio.AAALarge
                  ? 'aaa-pass'
                  : contrastRatio.AA || contrastRatio.AALarge
                    ? 'aa-pass'
                    : 'aa-fail'
              }
            >
              <a
                aria-label="More about color contrast"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.a11yproject.com/posts/2015-01-05-what-is-color-contrast/"
              ></a>
            </span>
            {contrastRatio.try
              && <span
                className="try-a11y-color"
                title="a11y color with improved contrast"
                aria-label="a11y color with improved contrast"
              >
                Try&nbsp;
                <button
                  className="link-style"
                  onClick={() => {
                    setColor(contrastRatio.try);
                    _onInput(contrastRatio.try);
                    setContrastRatio(null);
                  }}
                >
                  {contrastRatio.try}
                </button>
              </span>
            }
          </div>
        }
      </div>
    </div>
  );
}
