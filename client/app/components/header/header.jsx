/* eslint-disable react/prop-types */
import React from 'react';

import './header.css';

export function Pageheader(props) {
  const { headerTitle, headerSubtitles } = props;
  const _headerSubtitles = headerSubtitles && headerSubtitles.length
    ? headerSubtitles
    : [];

  return (
    <header>
      <div className="header-title">
        <h1>{headerTitle || ''}</h1>
        <div className="header-subtitle">
          {_headerSubtitles.map((sub, i) => <p key={i}>{sub}</p>)}
        </div>
      </div>
    </header>
  );
}
