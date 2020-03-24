/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// vendor
import Button from '@material-ui/core/Button';

// app
import './results.css';
import { Pageheader, Card } from '../';
import {
  getLogos,
  readCompany,
  domToImg
} from './results.helper';
import { Loading } from '../../icons';

export function Results(props) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [logosPage, setLogosPage] = useState(0);

  useEffect(() => {
    !results.length && getLogos(data => {
      setLogosPage(1);
      setLoading(false);
      setResults(data);
    }, () => {
      setLoading(false);
    });
  }, [results.length]);

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
          && <Loading
            className="loading-big"
            svgProps={{
              className: 'loading',
              width: '100'
            }}
          />}
          {!loading
          && <div id="user-results">
            {results.map((res, i) =>
              <Card
                key={i}
                cardId={`card-${i}`}
                name={readCompany(location.hash)}
                iconId={`card-svg-${i}`}
                textId={`card-text-${i}`}
                icon={res.icon}
                plainIcon={res.preview_url}
                plainName={readCompany(location.hash)}
                onClick={() => {
                  domToImg(`card-${i}`, `generated-logo-${i + 1}.png`);
                }}
              />
            )}
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
            <div>&nbsp;</div>
            <Button
              id="gen-more-btn"
              variant="contained"
              color="primary"
              onClick={() => {
                if (!loading) {
                  setLoading(true);
                  getLogos(data => {
                    setLogosPage(logosPage + 1);
                    setLoading(false);
                    setResults(data);
                  }, () => {
                    setLoading(false);
                  }, logosPage);
                }
              }}
            >
              {loading
                ? <Loading
                  className="loading-small"
                  svgProps={{
                    className: 'loading',
                    width: '25'
                  }}
                />
                : 'Generate More'
              }
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
