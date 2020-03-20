/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// vendor
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// app
import './results.css';
import { Pageheader } from '../';

const Card = ({ name, icon }) => <div
  tabIndex="0"
  aria-label="Result Card"
  className="results-card"
>
  <p>{icon || ''}</p>
  <p className="results-card-name">{name || ''}</p>
</div>;

export function Results() {
  const [results, setResults] = useState([
    { name: 'Coffee Shop', icon: '' },
    { name: 'Coffee Shop', icon: '' },
    { name: 'Coffee Shop', icon: '' },
    { name: 'Coffee Shop', icon: '' },
    { name: 'Coffee Shop', icon: '' },
    { name: 'Coffee Shop', icon: '' }
  ]);

  return (
    <div id="results-page">
      <Pageheader
        headerTitle="Your results"
        headerSubtitles={[
          'Click on the chosen logo to download a PNG file.',
          'If you didn’t like any of the results, just click “Generate more”.'
        ]}
      />
      <section className="main-section">
        <div id="results-wrap" className="main-box">
          <div id="user-results">
            {results.map((res, i) => <Card key={i} name={res.name} icon={res.icon} />)}
          </div>
          <div id="results-more">
            <Button
              id="go-back-btn"
              color="primary"
            >
              <Link to="/">Go Back</Link>
            </Button>
            <Button
              id="gen-more-btn"
              variant="contained"
              color="primary"
            >
              Generate More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
