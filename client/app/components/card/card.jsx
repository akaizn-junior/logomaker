/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { Download } from '../../icons';

import './card.css';

export function Card({ name, icon, textId, iconId, ...rest }) {
  const ICON = document.createRange().createContextualFragment(icon);
  const NAME = document.createRange().createContextualFragment(name);

  useEffect(() => {
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
  });

  return (
    <div {...rest}>
      <div className="download-panel" hidden>
        <p className="download-panel-icon"><Download /></p>
        <p className="download-panel-text">Click to download</p>
      </div>
      <div
        tabIndex="0"
        aria-label="Result Card"
        className="results-card"
      >
        <p id={iconId} className="results-card-icon"></p>
        <p id={textId} className="results-card-name"></p>
      </div>
    </div>
  );
}
