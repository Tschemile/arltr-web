import React from 'react';

interface TabsProps {
  options: Record<'key' | 'title' | 'content', any>[];
  defaultKey?: string;
  handleChange?: (value: string) => void;
  border?: boolean;
  className?: string;
}

export default function Tabs(props: TabsProps) {
  const {
    options = [],
    defaultKey = '1',
    handleChange = () => {},
    border = false,
    className = '',
  } = props;
  return (
    <>
      <ul
        className={`whitespace-normal ${
          border && 'border-b-[1px] border-b-[#ddd]'
        } ${className}`}
      >
        {options.map((x) => (
          <li
            className={`${
              defaultKey === x.key
                ? 'border-b-2 border-b-[#1a73e8] text-[#1a73e8] '
                : ''
            } inline-block cursor-pointer px-4 py-2`}
            key={x.key}
            onClick={() => handleChange(x.key)}
          >
            {x.title}
          </li>
        ))}
      </ul>
      {/* <div className="mt-4 w-full">
        {options[Number(defaultKey) - 1].content}
      </div> */}
    </>
  );
}
