/* eslint-disable react/prop-types */
import React from 'react';

import './card.css';

export function Card(props) {
  const {
    cardId,
    textId,
    iconId,
    plainIcon,
    plainName,
    ...rest
  } = props;

  return (
    <div
      id={cardId}
      tabIndex="0"
      aria-label="App Card"
      className="app-card"
      {...rest}
    >
      {plainIcon
        && <p id={iconId} className="app-card__icon">
          <img alt={plainName} src={plainIcon} width="60" />
        </p>
      }
      {plainName
        && <p id={textId} className="app-card__brand text-limit">
          {plainName || ''}
        </p>
      }
    </div>
  );
}
