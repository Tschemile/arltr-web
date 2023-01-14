import Image from 'next/dist/client/image';
import React from 'react';

import FemaleAvatar from '@/assets/female-default-avatar.jpg';
import MaleAvatar from '@/assets/male-default-avatar.png';

interface AvatarProps {
  width?: number;
  height?: number;
  className?: string;
  src: string | undefined;
  alt: string;
  gender?: string;
}

export default function Avatar(props: AvatarProps) {
  const {
    width = 40,
    height = 40,
    src = '',
    alt = '',
    className = '',
    gender = 'male',
  } = props;
  return (
    <Image
      src={src || (gender === 'male' ? MaleAvatar : FemaleAvatar)}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
