/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

export function BackArrow(props) {
  const { width, height, ...rest } = props;

  return (
    <svg
      viewBox="0 0 32 32"
      width={width || '50px'}
      height={width || height || '50px'}
      strokeWidth="3"
      aria-label="'Back Arrow' icon"
      {...rest}
    >
      <path
        d="M22.08 8.15L6.45 17.62L22.08 8.15Z"
        opacity="1"
        fill="var(--arrow-svg-color)"
        fillOpacity="1"
        stroke="var(--arrow-svg-color)"
        strokeWidth="3"
        strokeOpacity="1"
      ></path>
      <path
        d="M24.55 26.67L6.45 17.21L24.55 26.67Z"
        opacity="1"
        fillOpacity="1"
        stroke="var(--arrow-svg-color)"
        strokeWidth="3"
        strokeOpacity="1"
      ></path>
    </svg>
  );
}
