import type { ReactNode } from 'react';
import React from 'react';

interface IconButtonProps {
  children: ReactNode;
}

export default function IconButton(props: IconButtonProps) {
  return <button className="icon-header">{props.children}</button>;
}
