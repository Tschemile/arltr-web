import type { ReactNode } from 'react';
import React from 'react';

interface IActionButton {
  icon: ReactNode;
  className?: string;
  text: string;
  iconClassname?: string;
  onClick?: () => void;
}

export default function ActionButton(props: IActionButton) {
  const {
    icon = '',
    className = '',
    onClick = () => {},
    text = '',
    iconClassname = '',
  } = props;
  return (
    <div className={`nav-item ${className}`} onClick={onClick}>
      <span className={iconClassname}>{icon}</span>
      <p className="whitespace-nowrap pl-2 text-base text-[#929292]">{text}</p>
    </div>
  );
}
