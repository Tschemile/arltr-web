import React from 'react';

export default function InfoBlock() {
  return (
    <div className="mb-4 w-full animate-pulse rounded-md bg-tertiary-color p-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-28 rounded bg-slate-400"></div>
      </div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="my-2 flex items-center gap-4">
          <div className="h-6 w-6 rounded-full bg-slate-400"></div>
          <div className="h-4 w-60 rounded bg-slate-400"></div>
        </div>
      ))}
    </div>
  );
}
