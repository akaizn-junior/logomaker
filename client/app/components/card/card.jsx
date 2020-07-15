/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import './card.css';

export function Card(props) {
  const {
    name,
    cardId,
    icon,
    textId,
    iconId,
    svg,
    plainIcon,
    plainName,
    ...rest
  } = props;

  const ICON = document.createRange && document.createRange().createContextualFragment(icon);
  const NAME = document.createRange && document.createRange().createContextualFragment(name);

  useEffect(() => {
    if (svg) {
      let i = document.getElementById(iconId);
      let n = document.getElementById(textId);

      if (ICON && ICON.firstChild && ICON.firstChild.setAttribute) {
        ICON.firstChild.setAttribute('viewBox', '0 0 200 200');
        ICON.firstChild.setAttribute('width', '70px');
        ICON.firstChild.setAttribute('height', '70px');
      }

      if (NAME && NAME.firstChild && NAME.firstChild.setAttribute) {
        NAME.firstChild.setAttribute('viewBox', '0 0 200 200');
        NAME.firstChild.setAttribute('width', '150px');
        NAME.firstChild.setAttribute('height', '40px');
      }

      i && i.appendChild(ICON.firstChild);
      n && n.appendChild(NAME.firstChild);
    }
  });

  return (
    <div
      id={cardId}
      tabIndex="0"
      aria-label="Result Card"
      className="results-card"
      {...rest}
    >
      <p id={iconId} className="results-card-icon">
        {plainIcon && !svg
        && <img alt={plainName} src={plainIcon} width="60" />
        }
      </p>
      <p id={textId} className="results-card-name">{plainName || ''}</p>
    </div>
  );
}
