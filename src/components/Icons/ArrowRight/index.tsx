import React from 'react';

import type { IconProps } from '..';

export default function ArrowRight(props: IconProps) {
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
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
