/* eslint-disable react/prop-types */
import React from 'react';

import { Download } from '../../icons';

import './card.css';

export function Card({ name, icon }) {
  return (
    <div>
      <div className="download-panel" hidden>
        <p className="download-panel-icon"><Download /></p>
        <p className="download-panel-text">Click to download</p>
      </div>
      <div
        tabIndex="0"
        aria-label="Result Card"
        className="results-card"
      >
        <p className="results-card-icon">{icon || ''}</p>
        <p className="results-card-name">{name || ''}</p>
      </div>
    </div>
  );
}
