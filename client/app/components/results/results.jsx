/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// vendor
import Button from '@material-ui/core/Button';

// app
import './results.css';
import { Pageheader } from '../';
import { getLogos } from './results.helper';
import { Loading } from '../../icons/loading';
import { Download } from '../../icons/download';

const Card = ({ name, icon }) => <div>
  <div className="download-panel" hidden>
    <p className="download-panel-icon"><Download /></p>
    <p className="download-panel-text">Click to download</p>
  </div>
  <div
    tabIndex="0"
    aria-label="Result Card"
    className="results-card"
    onMouseOut={e => {
      const target = e.target.previousElementSibling;
      target && setTimeout(() => {
        target.setAttribute('hidden', 'hidden');
      }, 100);
    }}
    onMouseOver={e => {
      const target = e.target.previousElementSibling;
      target && target.removeAttribute('hidden');
    }}
  >
    <p>{icon || ''}</p>
    <p className="results-card-name">{name || ''}</p>
  </div>
</div>;

export function Results(props) {
  const [loading, setLoading] = useState(false);
  let company = new RegExp(/c=[a-zA-Z_0=9]+/g).exec(location.hash);
  let keywords = new RegExp(/k=[a-zA-Z_0=9]+/g).exec(location.hash);

  if (company && keywords) {
    company = company[0].split('=')[1].replace(/_/g, ' ');
    keywords = keywords[0].split('=')[1].replace(/_/g, ' ');
    getLogos(keywords, res => {
      setLoading(false);
      setResults(res);
    });
  }

  const [results, setResults] = useState([
    { name: company, icon: '' },
    { name: company, icon: '' },
    { name: company, icon: '' },
    { name: company, icon: '' },
    { name: company, icon: '' },
    { name: company, icon: '' }
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
          {loading
          && <Loading className="loading-big" svgProps={{ className: 'loading', width: '100' }} />
          }
          {!loading
          && <div id="user-results">
            {results.map((res, i) => <Card key={i} name={res.name} icon={res.icon} />)}
          </div>
          }
          <div id="results-more">
            <Button
              id="go-back-btn"
              color="primary"
              onClick={() => props.history.goBack()}
            >
              Go Back
            </Button>
            <Button
              id="gen-more-btn"
              variant="contained"
              color="primary"
              onClick={() => {
                if (!loading) {
                  setLoading(true);
                  getLogos(keywords, res => {
                    setLoading(false);
                    setResults(res);
                  });
                }
              }}
            >
              {loading ? <Loading className="loading-small" svgProps={{ className: 'loading', width: '25' }} /> : 'Generate More' }
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
