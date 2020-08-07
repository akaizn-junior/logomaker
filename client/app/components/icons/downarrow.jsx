/* eslint-disable react/prop-types */
import React from 'react';

export function DownArrow(props) {
  const { width, height, ...rest } = props;

  return (
    <svg
      viewBox="0 0 250 250"
      width={width || '32px'}
      height={width || height || '32px'}
      strokeWidth="3"
      aria-label="'Down Arrow' icon"
      style={{
        transform: 'rotate(90deg)'
      }}
      {...rest}
    >
      <g>
        <polygon
          style={{
            fill: 'var(--arrow-svg-color)',
            strokeWidth: 24,
            stroke: 'var(--arrow-svg-color)'
          }}
          points="152.835,39.285 146.933,45.183 211.113,109.373 0,109.373 0,117.723 211.124,117.723
      146.933,181.902 152.835,187.811 227.096,113.55"
        />
      </g>
    </svg>
  );
}
