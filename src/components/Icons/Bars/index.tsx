import React from 'react';

import type { IconProps } from '..';

export default function Bars(props: IconProps) {
  const { color = '', width = 28, className = '' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`p-1 ${className}`}
      width={width}
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}
