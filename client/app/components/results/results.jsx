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
  readBrandName,
  domToImg,
  readPack
} from './results.helper';
import { Link } from 'react-router-dom';

export function Results(props) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [results, setResults] = useState([]);
  const getPack = () => Number(readPack(location.hash));
  const [logosPack, setLogosPack] = useState(getPack());

  const newPack = n => props.location.search.replace(
    /pack=[0-9]+/,
    `pack=${n}`
  );

  const getLogosSuccess = n => data => {
    setLoading(false);
    setResults(data);
    n && props.history.push(newPack(n));
  };

  const getLogosErr = () => {
    setErr(true);
    setLoading(false);
  };

  useEffect(() => {
    !results.length && getLogos(
      getLogosSuccess(),
      getLogosErr,
      logosPack
    );
  }, [results.length, logosPack]);

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
                name={readBrandName(location.hash)}
                iconId={`generated-logo${i + 1}-icon`}
                textId={`generated-logo${i + 1}-name`}
                icon={res.icon}
                plainIcon={res.preview_url}
                plainName={readBrandName(location.hash)}
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
        {!loading && err
          && <div className="results__err">
            <p>Snap! Something went wrong on our side.</p>
            <p>Don&apos;t worry our <i>robots</i> humans are hard at work and have been notified.</p>
            <p><Link to="/">Try again</Link></p>
          </div>
        }
        <div className="results__more">
          <Button
            id="results__back"
            className="results__btn"
            onClick={() => {
              if (logosPack === 1 || err) {
                return props.history.push('/');
              } else if (!loading) {
                const goBackwards = logosPack - 1;
                setLogosPack(goBackwards);
                setLoading(true);
                getLogos(
                  getLogosSuccess(goBackwards),
                  getLogosErr,
                  goBackwards
                );
              }
            }}
          >
            <span>Go Back</span>
            <Arrow className="results__btn__arrow" />
          </Button>
          <Button
            id="results__generate-more"
            className="results__btn"
            onClick={() => {
              if (!loading) {
                const goForward = logosPack + 1;
                setLoading(true);
                setLogosPack(goForward);
                getLogos(
                  getLogosSuccess(goForward),
                  getLogosErr,
                  goForward
                );
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
