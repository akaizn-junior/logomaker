/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// vendor
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// app
import './landing.css';

import { Pageheader } from '../';

/**
 * Verifies a list of ids that should belong to inputs, then focus the first empty input.
 * Returns false when the first empty input is found, true if all inputs are filled.
 * @param {array} idsList The list of ids to verify
 */
export function verifyFilledInputs(idsList) {
  for (let i = 0; i < idsList.length; i++) {
    const elem = document.getElementById(idsList[i]);
    if (elem && !elem.value.length || elem[0] && !elem[0].innerText.length) {
      elem.focus();
      return false;
    }
  }
  return true;
}

export function Landing(props) {
  const [companyName, setCompanyName] = useState('');
  const [keywords, setKeywords] = useState('');
  const separator = '_';

  return (
    <div id="landing-page">
      <Pageheader
        headerTitle="Welcome to our Logo Maker"
        headerSubtitles={[
          'Type your company name, and a keyword about your business.',
          'We will generate logos based on the information given.'
        ]}
      />
      <section className="main-section">
        <div id="user-input" className="main-box">
          <div className="input-box">
            <TextField
              id="company-name"
              label="Company Name"
              variant="outlined"
              onBlur={e => {
                let value = e.target.value;
                if (value.length) {
                  value = value.replace(/\s/g, separator);
                  setCompanyName(encodeURI(value));
                }
              }}
              fullWidth
            />
            <TextField
              id="company-keywords"
              label="Keyword"
              variant="outlined"
              onBlur={e => {
                const value = e.target.value;
                if (value.length) {
                  const toInsert = value.replace(/\s/g, separator);
                  setKeywords(encodeURI(toInsert));
                }
              }}
              fullWidth
            />
          </div>
          <Button
            id="submit-button"
            onClick={() => {
              if (verifyFilledInputs([
                'company-name',
                'company-keywords'
              ])) {
                props.history.push(`results?c=${companyName}&k=${keywords}`);
              }
            }}
          >
            Submit
          </Button>
        </div>
      </section>
    </div>
  );
}
