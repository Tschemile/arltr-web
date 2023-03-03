import type { ReactNode } from 'react';
import React from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: any) => void;
  type?: 'submit' | 'button' | 'reset';
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    onSubmit = () => {},
    type = 'submit',
    loading = false,
    className = '',
  } = props;

  return (
    <button
      onClick={onSubmit}
      type={type}
      disabled={loading}
      className={`flex items-center whitespace-nowrap rounded bg-secondary-color py-1 px-2 text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-slate-400 ${className}`}
    >
      {loading && (
        <span className="mr-1 flex justify-center">
          <span className="spinner m-0 inline-block h-[20px] w-[20px]" />
        </span>
      )}
      {props.children}
    </button>
  );
}
