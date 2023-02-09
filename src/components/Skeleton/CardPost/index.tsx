import React from 'react';

export default function CardPostSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="mb-4 animate-pulse rounded-lg bg-white px-4 shadow-lg"
        >
          <div className="flex items-center gap-4 py-4">
            <div className="h-[45px] w-[45px] rounded-full bg-slate-400"></div>
            <div className="">
              <div className="h-4 w-40 rounded bg-slate-400"></div>
              <div className="mt-2 h-4 w-20 rounded bg-slate-400"></div>
            </div>
          </div>
          <div className="py-4">
            <div className="mb-4 h-4 w-1/2 rounded bg-slate-400"></div>
            <div className="h-20 w-full rounded bg-slate-400"></div>
          </div>
          <div className="grid grid-cols-2 text-center">
            <div className="mx-auto mb-4 h-4 w-20 rounded bg-slate-400"></div>
            <div className="mx-auto mb-4 h-4 w-20 rounded bg-slate-400"></div>
          </div>
        </div>
      ))}
    </>
  );
}
