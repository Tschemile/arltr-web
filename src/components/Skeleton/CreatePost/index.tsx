import React from 'react';

import Divider from '@/components/common/Divider';

export default function CreatePostSkeleton() {
  return (
    <div className="mb-4 animate-pulse rounded-md bg-white p-4">
      <div className="flex items-center">
        <div className="mr-4 h-[40px] w-[40px] rounded-full bg-slate-400"></div>
        <div className="h-8 w-1/2 cursor-pointer rounded-full bg-slate-400 px-4 py-2"></div>
      </div>
      <Divider />
      <div className="grid grid-cols-3">
        <div className="mx-auto h-6 w-32 rounded-full border-2 bg-slate-400 p-1"></div>
        <div className="mx-auto h-6 w-32 rounded-full border-2 bg-slate-400 p-1"></div>
        <div className="mx-auto h-6 w-32 rounded-full border-2 bg-slate-400 p-1"></div>
      </div>
    </div>
  );
}
