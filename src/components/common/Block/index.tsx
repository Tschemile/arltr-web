import type { ReactNode } from 'react';
import React from 'react';

interface BlockProps {
  title: string;
  children: ReactNode;
  seeAll?: boolean;
  showTotal?: boolean;
  total?: string | number;
  onClickSeeAll?: () => void;
}

const Block = (props: BlockProps) => {
  const {
    children = '',
    title = '',
    seeAll = true,
    total = 0,
    showTotal = true,
    onClickSeeAll = () => {},
  } = props;
  return (
    <div className="mb-4 w-full rounded-md bg-tertiary-color p-4 text-primary">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="mb-2 inline-block font-medium text-secondary">
            {title}
          </h4>
          {showTotal && (
            <span className="pl-2 text-base">{`(${total || 0})`}</span>
          )}
        </div>
        {seeAll && (
          <span
            className="cursor-pointer rounded px-2 py-1 text-xs text-blue-600 hover:bg-primary-color"
            onClick={onClickSeeAll}
          >
            See all
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Block;
