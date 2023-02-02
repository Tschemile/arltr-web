import React from 'react';

import type { IconProps } from '..';

export default function ZoomOut(props: IconProps) {
  const { color = '', width = 28 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="p-1"
      width={width}
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
      />
    </svg>
  );
}
