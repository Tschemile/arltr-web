import Image from 'next/dist/client/image';
import type { StaticImageData } from 'next/image';
import React from 'react';

interface AvatarProps {
  width?: number;
  height?: number;
  className?: string;
  src: string | StaticImageData;
  alt: string;
}

export default function Avatar(props: AvatarProps) {
  const { width = 40, height = 40, src = '', alt = '', className = '' } = props;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
