/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

export function WinkyFace(props) {
  const { width, height, ...rest } = props;

  return (
    <svg
      viewBox="0 0 512 512"
      width={width || '35px'}
      height={width || height || '35px'}
      strokeWidth="0"
      fill="var(--face-icon-color)"
      aria-label="'Winky face' emoji"
      {...rest}
    >
      <g>
        <path d="M341.638,14.677c-5.208-1.845-10.929,0.877-12.777,6.084c-1.849,5.209,0.875,10.929,6.084,12.779
			C428.876,66.874,491.987,156.273,491.987,256c0,130.124-105.862,235.985-235.985,235.985S20.015,386.122,20.015,256
			S125.876,20.015,256,20.015c5.527,0,10.007-4.481,10.007-10.007C266.007,4.481,261.527,0,256,0C114.84,0,0,114.84,0,256
			s114.84,256,256,256s256-114.84,256-256C512,147.819,443.536,50.84,341.638,14.677z"/>
      </g>
      <g>
        <path d="M361.013,341.839c-4.739-2.842-10.887-1.304-13.729,3.437c-10.199,17.013-28.191,27.579-46.954,27.579
			c-19.255,0-37.045-10.462-46.426-27.304c-2.69-4.828-8.785-6.562-13.613-3.872c-4.829,2.69-6.562,8.784-3.872,13.613
			c12.909,23.18,37.398,37.58,63.91,37.58c25.756,0,50.326-14.293,64.122-37.303C367.292,350.828,365.754,344.681,361.013,341.839z"
        />
      </g>
      <g>
        <path d="M425.194,209.142c-9.951-17.864-28.825-28.961-49.256-28.961c-19.844,0-38.76,10.991-49.368,28.685
			c-2.842,4.739-1.302,10.887,3.437,13.729c4.741,2.842,10.888,1.302,13.729-3.437c7.012-11.697,19.352-18.962,32.202-18.962
			c13.176,0,25.351,7.16,31.771,18.686c1.831,3.286,5.239,5.14,8.752,5.14c1.648,0,3.32-0.408,4.861-1.266
			C426.15,220.064,427.884,213.97,425.194,209.142z"/>
      </g>
      <g>
        <path d="M215.278,170.165c-22.072,0-40.029,17.957-40.029,40.029c0,22.072,17.957,40.029,40.029,40.029
			s40.029-17.957,40.029-40.029S237.35,170.165,215.278,170.165z M215.278,230.209c-11.036,0-20.015-8.979-20.015-20.015
			c0-11.036,8.979-20.015,20.015-20.015c11.036,0,20.015,8.979,20.015,20.015C235.293,221.23,226.314,230.209,215.278,230.209z"/>
      </g>
      <g>
        <circle cx="303.61" cy="14.784" r="10.007"/>
      </g>
    </svg>
  );
}