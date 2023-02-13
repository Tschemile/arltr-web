import type { ChangeEvent } from 'react';
import React from 'react';

interface ISelect {
  name: string;
  options: Record<'label' | 'value' | 'id' | string, string>[];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
  className?: string;
}

export default function Select(props: ISelect) {
  const {
    name = '',
    options = [],
    handleChange = () => {},
    defaultValue = '',
    className = '',
  } = props;
  return (
    <select
      className={`cursor-pointer rounded border border-primary-border px-2 py-1 text-base outline-none ${className}`}
      name={name}
      id={name}
      value={defaultValue}
      onChange={handleChange}
    >
      {options.length &&
        options.map((x: Record<string, string>) => (
          <option key={x.id} value={x.value}>
            {x.label}
          </option>
        ))}
    </select>
  );
}
