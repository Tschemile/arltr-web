import React from 'react';

export default function RelationShip() {
  return (
    <div className="mb-4 w-full animate-pulse rounded-md bg-tertiary-color p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-6 w-28 rounded bg-slate-400"></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="col-span-1 ">
            <div className="mb-2 h-[100px] rounded bg-slate-400"></div>
            <div className="h-6 w-12 rounded bg-slate-400"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
