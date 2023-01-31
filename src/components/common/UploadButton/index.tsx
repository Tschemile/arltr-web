import type { ChangeEvent, ReactNode } from 'react';
import React from 'react';

interface IUploadButton {
  children: ReactNode;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  className?: string;
  multiple?: boolean;
}

export default function UploadButton(props: IUploadButton) {
  const {
    children = '',
    handleChange = () => {},
    id = '',
    className = '',
    multiple = false,
  } = props;
  return (
    <form>
      <label htmlFor={id} className={className}>
        {children}
      </label>
      <input
        id={id}
        type="file"
        accept=".jpg, .png, .jpeg"
        className="hidden"
        onChange={handleChange}
        multiple={multiple}
      />
    </form>
  );
}
