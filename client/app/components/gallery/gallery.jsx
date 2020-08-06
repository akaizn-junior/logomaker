/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import './gallery.css';
// components
import {
  Card,
  Button,
  Loading
} from '..';
import { Robot, BackArrow } from '../icons';
// helpers
import {
  getLogos,
  readBrandName,
  readPack,
  readKeywords
} from './gallery.helper';

export function Gallery(props) {
  const [loading, setLoading] = useState(true);
  const [cantLoadMore, setCantLoadMore] = useState(false);
  const [err, setErr] = useState(false);

  const [gallery, setGallery] = useState([]);

  const getPack = () => readPack(location.hash);
  const [iconsPack, setIconsPack] = useState(getPack());
  const brandName = readBrandName(location.hash);
  const keywords = readKeywords(location.hash);

  const newPack = n => props.location.search
    .replace(
      /pack=[0-9]+/,
      `pack=${n}`
    );

  const getLogosSuccess = n => data => {
    setErr(false);
    setLoading(false);
    setGallery(data);
    setCantLoadMore(data.length < 6);
    n && props.history.push(newPack(n));
  };

  const getLogosErr = () => {
    setErr(true);
    setCantLoadMore(true);
    setLoading(false);
  };

  useEffect(() => {
    !gallery.length && getLogos(
      getLogosSuccess(),
      getLogosErr,
      iconsPack
    );

    return () => {};
  }, [gallery.length, iconsPack]);

  return (
    <section className="gallery">
      <div className="gallery__panel">
        {!loading && !err
          && <div className="gallery__brand-logos">
            {gallery.map((res, i) =>
              <Link
                key={i}
                to={`editor?b=${brandName}&k=${keywords}&pack=${iconsPack}i=${i}`}
                className="card"
              >
                <Card
                  cardId={`generated-logo${i + 1}`}
                  iconId={`generated-logo${i + 1}-icon`}
                  textId={`generated-logo${i + 1}-name`}
                  plainIcon={res.preview_url}
                  plainName={brandName}
                />
              </Link>
            )}
          </div>
        }
        {loading && <div className="gallery__placeholder">
          {[0, 0, 0, 0, 0, 0].map((_d, i) => <Card
            key={i}
            placeholder
          />)
          }
        </div>}
        {!loading && err
          && <div className="gallery__err">
            <p>Snap! Something went wrong on our side.</p>
            <p>Don&apos;t worry our <i>robots</i> humans are hard at work and have been notified.</p>
            <p>
              <button
                className="link-style"
                onClick={() => {
                  setLoading(true);
                  getLogos(
                    getLogosSuccess(),
                    getLogosErr,
                    iconsPack
                  );
                }}
              >
                Try again
              </button>
              <span>&nbsp;&nbsp;</span>
              <Link to="/">Go back</Link>
            </p>
          </div>
        }
        <div className="gallery__more">
          <Button
            id="gallery__back"
            className="gallery__btn"
            onClick={() => {
              if (iconsPack === 1 || err) {
                return props.history.push('/');
              } else if (!loading) {
                const goBackwards = iconsPack - 1;
                setIconsPack(goBackwards);
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
            <BackArrow className="gallery__btn__arrow" />
          </Button>
          <Button
            id="gallery__generate-more"
            className="gallery__btn"
            disabled={cantLoadMore}
            onClick={() => {
              if (!loading) {
                const goForward = iconsPack + 1;
                setLoading(true);
                setIconsPack(goForward);
                getLogos(
                  getLogosSuccess(goForward),
                  getLogosErr,
                  goForward
                );
              }
            }}
          >
            {loading
              ? <Loading maxWidth="20px" />
              : 'More'
            }
            <Robot className="gallery__btn__robot" />
          </Button>
        </div>
      </div>
    </section>
  );
}
