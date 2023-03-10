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
  value?: string;
  inpulClassName?: string;
  defaultValue?: string;
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
    value = '',
    inpulClassName = '',
  } = props;

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-[50%] left-2 translate-y-[-50%] text-[#929292]">
        {icons || ''}
      </div>
      <input
        className={`h-[40px] py-2 pr-4 ${
          icons ? 'pl-10' : 'pl-4'
        } rounded-lg bg-primary-color outline-none placeholder:text-[#929292] ${inpulClassName}`}
        placeholder={placeholder}
        style={{ width }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
