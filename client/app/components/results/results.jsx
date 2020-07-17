/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// styles
import './results.css';
// components
import { Card, Button, Loading } from '../';
import { Robot, Arrow } from '../icons';
// helpers
import {
  getLogos,
  readCompany,
  domToImg
} from './results.helper';

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
    <section className="results">
      <div className="results__panel">
        {loading
          && <Loading top="35%" maxWidth="130px" />
        }
        {!loading
          && <div className="results__brand-logos">
            {results.map((res, i) =>
              <Card
                key={i}
                cardId={`generated-logo${i + 1}`}
                name={readCompany(location.hash)}
                iconId={`generated-logo${i + 1}-icon`}
                textId={`generated-logo${i + 1}-name`}
                icon={res.icon}
                plainIcon={res.preview_url}
                plainName={readCompany(location.hash)}
                onClick={() => {
                  domToImg(
                    `generated-logo${i + 1}`,
                    `generated-logo-${i + 1}.png`
                  );
                }}
              />
            )}
          </div>
        }
        {loading && <div className="results__placeholder"></div>}
        <div className="results__more">
          <Button
            id="results__back"
            className="results__btn"
            onClick={() => props.history.goBack()}
          >
            <span>Go Back</span>
            <Arrow className="results__btn__arrow" />
          </Button>
          <Button
            id="results__generate-more"
            className="results__btn"
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
              ? <Loading maxWidth="25px" />
              : 'More'
            }
            <Robot className="results__btn__robot" />
          </Button>
        </div>
      </div>
    </section>
  );
}
