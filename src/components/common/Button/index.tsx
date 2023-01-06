import type { ReactNode } from 'react';
import React from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <button className="whitespace-nowrap rounded bg-[#307ee5] py-2 px-4 font-bold text-white	">
      {props.children}
    </button>
  );
}
