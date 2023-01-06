/* eslint-disable tailwindcss/no-contradicting-classname */
import type { ReactNode } from 'react';
import React from 'react';

interface TooltipProps {
  children: ReactNode;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  showArrow?: boolean;
  description: string;
}

export default function Tooltip(props: TooltipProps) {
  const { direction = 'bottom', showArrow = false, description } = props;
  const way = {
    bottom: '-bottom-8 flex-col ',
    top: '-top-8 flex-col ',
    left: '-left-10 flex-row ',
    right: '-right-10 flex-row ',
  };
  const customClass = way[direction];
  return (
    <div className="group relative flex flex-col items-center hover:justify-center">
      {props.children}
      <div
        className={`absolute hidden items-center group-hover:flex ${customClass}`}
      >
        {showArrow && <div className="-mb-2 h-3 w-3 rotate-45 bg-black" />}
        <span className="relative z-10 bg-black p-2 text-xs leading-none text-white shadow-lg">
          {description}
        </span>
      </div>
    </div>
  );
}
