/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

export function LostIcon(props) {
  const { width, height, ...rest } = props;

  return (
    <svg
      viewBox="0 0 60.00 60.00"
      width={width || '150px'}
      height={height || width || '150px'}
      strokeWidth="0"
      {...rest}
    >
      <path
        style={{ fill: '#231F20' }}
        d="M57,0H3C1.346,0,0,1.346,0,3v56c0,0.552,0.448,1,1,1h58c0.552,0,1-0.448,1-1V3 C60,1.346,58.654,0,57,0z M3,2h54c0.551,0,1,0.449,1,1v5H2V3C2,2.449,2.449,2,3,2z M19,53v5h-8v-5H19z M21,53h8v5h-8V53z M31,53h8 v5h-8V53z M41,53h8v5h-8V53z M2,51V17h56v34H2z M2,15v-5h56v5H2z M2,53h7v5H2V53z M51,58v-5h7v5H51z"
      >
      </path>
      <rect x="5" y="4" style={{ fill: '#231F20' }} width="4" height="2"></rect>
      <rect x="12" y="4" style={{ fill: '#231F20' }} width="4" height="2"></rect>
      <path style={{ fill: '#231F20' }} d="M16,24h-2v13H8V24H6v14c0,0.552,0.448,1,1,1h7v6h2v-6h3v-2h-3V24z"></path>
      <path style={{ fill: '#231F20' }} d="M54,37h-3V24h-2v13h-6V24h-2v14c0,0.552,0.448,1,1,1h7v6h2v-6h3V37z"></path>
      <path style={{ fill: '#231F20' }} d="M30,24c-3.86,0-7,3.14-7,7v7c0,3.86,3.14,7,7,7s7-3.14,7-7v-7C37,27.14,33.86,24,30,24z M35,38 c0,2.757-2.243,5-5,5s-5-2.243-5-5v-7c0-2.757,2.243-5,5-5s5,2.243,5,5V38z"></path>
    </svg>
  );
}
