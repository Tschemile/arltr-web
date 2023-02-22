import React from 'react';

interface ICardSkeleton {
  total?: number;
  className?: string;
}

export default function CardSkeleton(props: ICardSkeleton) {
  const { total = 4, className = '' } = props;
  return (
    <div
      className={`grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 ${className}`}
    >
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className="grid-cols-1 rounded-lg border border-gray-400"
        >
          <div className="max-h-[185px] min-h-[185px] rounded-t-lg bg-slate-400 lg:min-h-[200px] 2xl:min-h-[15rem]"></div>
          <div className="p-3">
            <div className="h-4 w-24 rounded bg-slate-400"></div>
            <div className="my-2 h-4 w-16 rounded bg-slate-400"></div>
            <div className="h-7 w-full rounded bg-slate-400"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
