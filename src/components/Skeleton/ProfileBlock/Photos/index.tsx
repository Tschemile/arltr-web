import React from 'react';

export default function PhotosBlock() {
  return (
    <div className="mb-4 w-full animate-pulse rounded-md bg-tertiary-color p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-6 w-28 rounded bg-slate-400"></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="col-span-1 h-[100px] w-full rounded bg-slate-400"
          >
            <div className="h-full w-full rounded-lg object-cover"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
