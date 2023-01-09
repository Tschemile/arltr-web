import React from 'react';

interface IconProps {
  color?: string;
  width?: number;
}

export default function ArrowDown(props: IconProps) {
  const { color = '', width = 28 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="p-1"
      width={width}
      color={color}
    >
      <path
        fillRule="evenodd"
        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
