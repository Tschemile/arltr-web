/* eslint-disable tailwindcss/no-contradicting-classname */
import type { ReactNode } from 'react';
import React from 'react';

interface TooltipProps {
  children: ReactNode;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  showArrow?: boolean;
  description: string | undefined;
}

export default function Tooltip(props: TooltipProps) {
  const { direction = 'bottom', showArrow = false, description } = props;
  const way = {
    bottom: '-bottom-8 flex-col ',
    top: '-top-8 flex-col ',
    left: '-left-10 flex-row ',
    right: '-right-10 flex-row ',
  };
  const arrow = {
    bottom: '-mb-2',
    top: '-mt-2',
    left: '-ml-2',
    right: '-mr-2',
  };
  const customClass = way[direction];
  const customArrow = arrow[direction];
  return (
    <div className="group relative flex flex-col hover:justify-center">
      {props.children}
      <div
        className={`absolute hidden w-max items-center opacity-75 group-hover:flex ${customClass}`}
      >
        {showArrow && ['bottom', 'right'].includes(direction) && (
          <div className={`${customArrow} h-3 w-3 rotate-45 bg-black`} />
        )}
        <span className="relative z-10 bg-black p-2 text-xs leading-none text-white shadow-lg">
          {description}
        </span>
        {showArrow && ['top', 'left'].includes(direction) && (
          <div className={`${customArrow} h-3 w-3 rotate-45 bg-black`} />
        )}
      </div>
    </div>
  );
}
