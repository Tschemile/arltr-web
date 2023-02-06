import type { ReactNode } from 'react';
import React from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: any) => void;
  type?: 'submit' | 'button' | 'reset';
  loading?: boolean;
  background?: 'primary' | 'secondary' | 'gray';
}

export default function Button(props: ButtonProps) {
  const {
    onSubmit = () => {},
    type = 'submit',
    loading = false,
    background = 'primary',
    className = '',
  } = props;

  const getBackground = () => {
    switch (background) {
      case 'primary':
        return 'bg-[#307ee5]';
      case 'secondary':
        return 'bg-[#e3e7f7]';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onSubmit}
      type={type}
      disabled={loading}
      className={`flex items-center whitespace-nowrap rounded ${getBackground()} py-1 px-2 ${
        background === 'primary' ? 'text-white' : 'text-black'
      } disabled:cursor-not-allowed disabled:bg-slate-400 ${className}`}
    >
      {loading && (
        <span className="spinner mr-2 inline-block h-[20px] w-[20px]"></span>
      )}
      {props.children}
    </button>
  );
}
