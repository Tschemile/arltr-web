import React from 'react';

interface AvatarProps {
  width?: string;
  src: string;
  alt: string;
}

export default function Avatar(props: AvatarProps) {
  const { width = '100%', src = '', alt = '' } = props;
  return <img src={src} alt={alt} style={{ width }} className="rounded-full" />;
}
