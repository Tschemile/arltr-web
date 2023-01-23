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
      {[0, 1, 2, 3, 4, 5].map((x) => (
        <Item key={x} />
      ))}
      <Divider />
      <div className="h-6 w-1/2 rounded bg-slate-700"></div>
      {[0, 1, 2, 3].map((x) => (
        <Item key={x} />
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
      </div>
    </div>
  );
}