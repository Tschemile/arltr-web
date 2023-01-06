import type { ReactNode } from 'react';
import React from 'react';

interface CardProps {
  children: ReactNode;
}

export default function Card(props: CardProps) {
  return (
    <div className={`rounded-lg bg-white p-3 shadow-lg`}>{props.children}</div>
  );
}
