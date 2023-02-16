import React from 'react';

interface IReactionSkeleton {
  total?: number;
}

export const ReactionSkeleton = (props: IReactionSkeleton) => {
  const { total = 0 } = props;
  return (
    <>
      {[...Array(total)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="flex items-center py-2">
            <div className="mr-4 h-[30px] w-[30px] rounded-full bg-slate-400"></div>
            <div className="h-6 w-60 rounded-full bg-slate-400"></div>
          </div>
        </div>
      ))}
    </>
  );
};
