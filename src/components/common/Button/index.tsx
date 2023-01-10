import type { ReactNode } from 'react';
import React from 'react';

interface ButtonProps {
  children: ReactNode;
  onSubmit?: () => void;
  type?: 'submit' | 'button' | 'reset';
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onSubmit = () => {}, type = 'submit', loading = false } = props;
  return (
    <button
      onClick={onSubmit}
      type={type}
      disabled={loading}
      className="flex items-center whitespace-nowrap rounded bg-[#307ee5] py-2 px-4 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400	"
    >
      {loading && (
        <span className="spinner mr-2 block h-[20px] w-[20px]"></span>
      )}
      {props.children}
    </button>
  );
}
