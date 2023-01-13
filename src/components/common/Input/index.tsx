import type { ChangeEvent, ReactNode } from 'react';
import React from 'react';

interface InputProps {
  placeholder?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  icons?: ReactNode;
  width?: string;
  type?: 'text' | 'password' | 'number';
  name?: string;
  className?: string;
}

export default function Input(props: InputProps) {
  const {
    placeholder = 'Type here...',
    onChange = () => {},
    icons = '',
    width = '100%',
    type = 'text',
    name = '',
    className = '',
  } = props;
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-[50%] left-2 translate-y-[-50%] text-[#929292]">
        {icons || ''}
      </div>
      <input
        className={`h-[40px] py-2 pr-4 ${
          icons ? 'pl-10' : 'pl-4'
        } bg-main rounded-lg outline-none placeholder:text-[#929292]`}
        placeholder={placeholder}
        style={{ width }}
        type={type}
        name={name}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
