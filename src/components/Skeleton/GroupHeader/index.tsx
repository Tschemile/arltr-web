import React from 'react';

export default function GroupHeader() {
  return (
    <div className="animate-pulse bg-tertiary-color lg:mx-[5%] xl:mx-[10%]">
      <div className="relative max-h-full min-h-[285px] bg-slate-700">
        <div className="absolute bottom-2 right-3 z-10">
          <div className="flex h-10 w-20 cursor-pointer items-center rounded-md bg-slate-400 px-2 py-1"></div>
        </div>
        <div className="absolute bottom-3 left-3 z-10 h-[120px] w-[120px]">
          <div className="h-full w-full rounded-full border-[3px] border-solid border-white bg-slate-600" />
        </div>
      </div>
      <div className=" px-6 py-4">
        <div className="mx-auto h-6 w-1/4 rounded bg-slate-400 sm:mx-0"></div>
      </div>
      <div className="px-6 sm:flex sm:items-center sm:justify-between">
        <div className="mt-2 flex items-center justify-center sm:justify-start">
          <div className="h-12 w-12 rounded-full border-2 bg-slate-400"></div>
          <div className="-ml-3 h-12 w-12 rounded-full border-2 bg-slate-400"></div>
        </div>
      </div>
      <div className="mt-2 flex flex-col-reverse items-center justify-between p-2 px-6 sm:flex-row ">
        <div className="mt-2 flex items-center justify-center sm:justify-start">
          <div className="mr-3 h-5 w-16 rounded bg-slate-400" />
          <div className="mr-3 h-5 w-14 rounded bg-slate-400" />
          <div className="mr-3 h-5 w-16 rounded bg-slate-400" />
          <div className="mr-3 h-5 w-14 rounded bg-slate-400" />
          <div className="h-5 w-14 rounded bg-slate-400" />
        </div>
        <div className="mt-2 flex items-center justify-center lg:mt-0 lg:justify-end">
          <div className="h-8 w-24 rounded bg-slate-400" />
          <div className="mx-3 h-8 w-14 rounded bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
