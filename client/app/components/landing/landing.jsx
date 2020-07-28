/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// utils
import { verifyFilledInputs } from '../../utils/browser';
// components
import {
  Button,
  Input
} from '../';
import {
  Robot
} from '../icons';
// style
import './landing.css';

export function Landing(props) {
  const [brandName, setBrandName] = useState('');
  const [keywords, setKeywords] = useState('');
  const separator = '_';

  const submit = () => {
    if (verifyFilledInputs([
      'brand-name',
      'brand-keywords'
    ])) {
      props.history.push(`results?b=${brandName}&k=${keywords}&pack=1`);
    }
  };

  const readValue = set => e => {
    const value = e.target.value;
    if (value.length) {
      const toInsert = value.replace(/\s/g, separator);
      set(encodeURI(toInsert));
    }
  };

  return (
    <section className="landing">
      <div className="landing__panel">
        <Input
          id="brand-name"
          type="text"
          label="Brand Name"
          remember="brand-name"
          onBlur={readValue(setBrandName)}
          maxLength={50}
          aria-label="'Brand Name' input text-field"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              document.getElementById('brand-keywords')
                .focus();
            }
          }}
        />
        <Input
          id="brand-keywords"
          label="Keywords"
          remember="brand-keywords"
          onBlur={readValue(setKeywords)}
          maxLength={50}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="true"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              document.getElementById('submit-brand')
                .focus();
            }
          }}
        />
        <Button
          id="submit-brand"
          className="make-button"
          aria-label="'Make logos' button"
          onClick={submit}
        >
          <span>Make</span>
          <Robot className="make-button__robot" />
        </Button>
      </div>
    </section>
  );
}
