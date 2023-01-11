import React from 'react';

interface AvatarProps {
  width?: string;
  height?: string;
  className?: string;
  src: string;
  alt: string;
}

export default function Avatar(props: AvatarProps) {
  const {
    width = '100%',
    height = 'auto',
    src = '',
    alt = '',
    className = '',
  } = props;
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height }}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
