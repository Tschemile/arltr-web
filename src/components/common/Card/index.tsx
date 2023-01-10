import type { ReactNode } from 'react';
import React from 'react';

interface CardProps {
  children: ReactNode;
  img?: string;
}

export default function Card(props: CardProps) {
  const { img = '' } = props;
  return (
    <div className={`rounded-lg bg-white shadow-lg`}>
      {!!img && <img src={img} alt="image" className="w-full rounded-t-lg" />}
      <div className="p-3">{props.children}</div>
    </div>
  );
}
