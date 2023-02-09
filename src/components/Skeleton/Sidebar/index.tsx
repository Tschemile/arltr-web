import React from 'react';

import Divider from '@/components/common/Divider';

export default function Sidebar() {
  const Item = () => (
    <div className="mx-auto w-full max-w-sm px-4 py-2">
      <div className="flex space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-6 py-3">
          <div className="h-4 rounded bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="animate-pulse">
      {[...Array(6)].map((_, index) => (
        <Item key={index} />
      ))}
      <Divider />
      <div className="h-6 w-1/2 rounded bg-slate-700"></div>
      {[...Array(4)].map((_, index) => (
        <Item key={index} />
      ))}
      <Divider />
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-slate-700"></div>
          <div className="col-span-1 h-2 rounded bg-slate-700"></div>
        </div>
        <div className="h-2 rounded bg-slate-700"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 h-2 rounded bg-slate-700"></div>
          <div className="col-span-2 h-2 rounded bg-slate-700"></div>
        </div>
        <div className="h-2 rounded bg-slate-700"></div>
        <div className="h-2 rounded bg-slate-700"></div>
        <div className="h-2 rounded bg-slate-700"></div>
      </div>
    </div>
  );
}
