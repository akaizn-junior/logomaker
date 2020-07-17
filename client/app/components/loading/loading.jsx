/* eslint-disable react/prop-types */
import React from 'react';

import './loading.css';

export function Loading(props) {
  const { top, maxWidth, shade } = props;

  return (
    <div className="loading">
      {shade && <div className="loading__shade"></div>}
      <div className="loading__mini" style={{ top, maxWidth }}></div>
    </div>
  );
}
