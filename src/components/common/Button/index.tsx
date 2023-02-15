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
      className={`flex items-center whitespace-nowrap rounded  bg-pink-400 py-1 px-2 text-white disabled:cursor-not-allowed disabled:bg-slate-400 ${className}`}
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
