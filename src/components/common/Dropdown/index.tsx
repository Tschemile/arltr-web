import type { ReactNode } from 'react';
import React from 'react';

interface IDropdown {
  children: ReactNode;
  content: any;
  open: boolean;
}

export default function Dropdown(props: IDropdown) {
  const { children = '', content = [], open = false } = props;
  return (
    <div className="relative text-base">
      {children}
      {open && (
        <ul className="absolute top-6 right-0 z-10 rounded border bg-white shadow-lg">
          {content.map((x: any) => (
            <li
              key={x.id}
              className="cursor-pointer whitespace-nowrap rounded px-4 py-2 hover:bg-slate-400 hover:text-white"
              onClick={x.handleCLick}
            >
              {x.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
