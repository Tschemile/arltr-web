import type { ReactNode } from 'react';
import React from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
}

export default function IconButton(props: IconButtonProps) {
  const { className = '' } = props;
  return (
    <button className={`icon-header ${className} text-primary`}>
      {props.children}
    </button>
  );
}
