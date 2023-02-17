import type { ReactNode } from 'react';
import React from 'react';

interface IDropdown {
  children: ReactNode;
  content: any;
}

interface IItem {
  handleClick?: () => void;
  id: string;
  title: string;
}

export default function Dropdown(props: IDropdown) {
  const { children = '', content = [] } = props;
  return (
    <div className="group relative flex text-base">
      {children}
      <ul className="invisible absolute top-8 right-0 z-10 rounded border bg-white opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
        {content.map((x: IItem) => (
          <li key={x.id}>
            <button
              className="w-full space-x-2 whitespace-nowrap rounded px-4 py-2 text-left hover:bg-slate-400 hover:text-white"
              onClick={x.handleClick}
            >
              {x.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
