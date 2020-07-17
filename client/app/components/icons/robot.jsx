/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

export function Robot(props) {
  const { width, height, ...rest } = props;

  return (
    <svg
      viewBox="55 50 40 30"
      width={width || '50px'}
      height={width || height || '50px'}
      strokeWidth="0"
      fill="var(--primary-dark)"
      aria-label="'Robot' svg"
      {...rest}
    >
      <path
        d="M88.19 66.94C88.19 73.99 82.28 79.72 75 79.72C67.72 79.72 61.81 73.99 61.81 66.94C61.81 59.89 67.72 54.17 75 54.17C82.28 54.17 88.19 59.89 88.19 66.94Z"
        opacity="1"
        fill="var(--primary-dark)"
        fillOpacity="1"
      ></path>
      <path
        d="M59.81 57.22L63.81 57.22L63.81 76.66L59.81 76.66L59.81 57.22Z"
        opacity="1"
        fill="var(--primary-dark)"
        fillOpacity="1"
      ></path>
      <path
        d="M86.19 57.22L90.19 57.22L90.19 76.66L86.19 76.66L86.19 57.22Z"
        opacity="1"
        fill="var(--primary-dark)"
        fillOpacity="1"
      ></path>
      <path
        d="M80.97 68.06C80.97 70.51 79.17 72.5 76.94 72.5C74.72 72.5 72.92 70.51 72.92 68.06C72.92 65.6 74.72 63.61 76.94 63.61C79.17 63.61 80.97 65.6 80.97 68.06Z"
        opacity="1"
        fill="var(--primary-accent)"
        fillOpacity="1"
      ></path>
      <path
        d="M72.92 79.72L67.92 88.61"
        opacity="1"
        fill="var(--primary-dark)"
        fillOpacity="1"
        stroke="var(--primary-dark)"
        strokeWidth="1"
        strokeOpacity="1"
      ></path>
      <path
        d="M73.75 52.78L68.75 43.89"
        opacity="1"
        fillOpacity="0"
        stroke="var(--primary-dark)"
        strokeWidth="1"
        strokeOpacity="1"
      ></path>
    </svg>
  );
}
