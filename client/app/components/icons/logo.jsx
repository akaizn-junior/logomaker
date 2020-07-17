/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

export function Logo(props) {
  const { width, height, ...rest } = props;
  return (
    <svg
      width={width || '165'}
      height={height || width || '45'}
      viewBox="0 0 100 40"
      {...rest}
    >
      <text
        x="0"
        y="84"
        fontSize="40"
        fontFamily="Quicksand, sans-serif"
        fontWeight="normal"
        fontStyle="normal"
        letterSpacing="0"
        alignmentBaseline="before-edge"
        transform="matrix(1 0 0 1 -40.27838743772324 -89.43089743743914)"
        dominantBaseline="text-before-edge"
        opacity="1"
        fill="var(--brand-svg-color)"
        fillOpacity="1"
        style={{
          fontFamily: 'Quicksand, sans-serif'
        }}
      >
        <tspan
          x="20"
          dy="0em"
          alignmentBaseline="before-edge"
          dominantBaseline="text-before-edge"
          textAnchor="start"
        >
          Gabriel.
        </tspan>
      </text>
    </svg>
  );
}
