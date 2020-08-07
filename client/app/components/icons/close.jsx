/* eslint-disable react/prop-types */
import React from 'react';

export function CloseIcon(props) {
  const { width, height, ...rest } = props;

  return (
    <svg
      viewBox="0 -5 50 60"
      width={width || '27px'}
      height={width || height || '27px'}
      strokeWidth="7"
      stroke="var(--arrow-svg-color)"
      fill="var(--arrow-svg-color)"
      aria-label="'Close' icon"
      style={{
        transform: 'rotate(2deg)'
      }}
      {...rest}
    >
      <g>
        <path
          d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
		c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
		C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
    s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
        />
      </g>
    </svg>
  );
}
