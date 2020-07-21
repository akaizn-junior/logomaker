/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// components
import {
  Button,
  Input,
  Keywords
} from '../';
import {
  Robot
} from '../icons';
// style
import './landing.css';

/**
 * Verifies a list of ids that should belong to inputs, then focus the first empty input.
 * Returns false when the first empty input is found, true if all inputs are filled.
 * @param {array} ids The list of ids to verify
 */
export function verifyFilledInputs(ids) {
  for (let i = 0; i < ids.length; i++) {
    const elem = document.getElementById(ids[i]);

    if (elem && elem.localName === 'input' && !elem.value.length) {
      elem.focus();
      return false;
    }

    if (elem && elem.localName === 'div' && !elem.innerText.length) {
      elem.focus();
      return false;
    }
  }

  return true;
}

export function Landing(props) {
  const [brandName, setBrandName] = useState('');
  const [keywords, setKeywords] = useState('');
  const separator = '_';

  return (
    <section className="landing">
      <div className="landing__panel">
        <Input
          id="brand-name"
          type="text"
          label="Brand Name"
          remember="brand-name"
          onBlur={e => {
            let value = e.target.value;
            if (value.length) {
              value = value.replace(/\s/g, separator);
              setBrandName(encodeURI(value));
            }
          }}
          aria-label="'Brand Name' input text-field"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
        <Keywords
          id="brand-keywords"
          label="Keywords"
          remember="brand-keywords"
          onBlur={e => {
            const value = e.target.value;
            if (value.length) {
              const toInsert = value.replace(/\s/g, separator);
              setKeywords(encodeURI(toInsert));
            }
          }}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
        <Button
          className="make-button"
          aria-label="'Make logos' button"
          onClick={() => {
            if (verifyFilledInputs([
              'brand-name',
              'brand-keywords'
            ])) {
              props.history.push(`results?b=${brandName}&k=${keywords}&pack=1`);
            }
          }}
        >
          <span>Make</span>
          <Robot className="make-button__robot" />
        </Button>
      </div>
    </section>
  );
}
