import type { ReactNode } from 'react';
import React from 'react';

interface CardProps {
  children: ReactNode;
  img?: string;
  className?: string;
  imgClassName?: string;
  onClickImg?: () => void;
}

export default function Card(props: CardProps) {
  const {
    img = '',
    className = '',
    onClickImg = () => {},
    imgClassName = '',
  } = props;
  return (
    <div className={`rounded-lg bg-white shadow-lg ${className}`}>
      {!!img && (
        <div className="relative max-h-[185px] min-h-[185px] overflow-hidden rounded-t-lg lg:min-h-[200px] 2xl:min-h-[15rem]">
          <img
            src={img}
            alt="image"
            onClick={onClickImg}
            className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover ${imgClassName}`}
          />
        </div>
      )}
      <div className="p-3">{props.children}</div>
    </div>
  );
}
