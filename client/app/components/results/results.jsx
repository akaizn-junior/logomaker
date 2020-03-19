/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
        <div id="user-results" className="main-box">
          {results.map((res, i) => <Card key={i} name={res.name} icon={res.icon} />)}
        </div>
      </section>
    </div>
  );
}
