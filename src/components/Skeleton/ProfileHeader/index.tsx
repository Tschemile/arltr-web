import React from 'react';

export default function ProfileHeader() {
  return (
    <div className="animate-pulse bg-white lg:mx-[10%] xl:mx-[15%]">
      <div className="relative max-h-full min-h-[285px] bg-slate-700">
        <div className="absolute bottom-2 right-3 z-[3] h-3 rounded bg-slate-400 px-7 py-4" />
      </div>
      <div className="relative z-[2] -mt-24 mb-4 text-center">
        <div className="mx-auto mb-2 h-[120px] w-[120px]">
          <div className="h-full w-full rounded-full border-[3px] border-solid border-white bg-slate-600" />
          {/* <div className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-500 p-[18px] sm:left-[53%]" /> */}
          <>
            <h1 className="mt-3 h-4 w-full rounded bg-slate-700" />
            <div className="mx-auto mt-1 h-[13px] w-5/6 rounded bg-slate-700" />
          </>
        </div>
      </div>
      <div className="mt-16 flex flex-col-reverse items-center justify-between p-2 sm:px-4 lg:flex-row">
        <div className="mt-2 flex w-10/12 justify-center sm:w-1/2 lg:mt-0 lg:justify-start">
          <div className="mr-3 h-5 w-16 rounded bg-slate-400" />
          <div className="mr-3 h-5 w-14 rounded bg-slate-400" />
          <div className="mr-3 h-5 w-16 rounded bg-slate-400" />
          <div className="mr-3 h-5 w-14 rounded bg-slate-400" />
          <div className="h-5 w-14 rounded bg-slate-400" />
        </div>
        <div className="mt-2 flex w-1/2 items-center justify-center lg:mt-0 lg:justify-end">
          <div className="h-8 w-24 rounded bg-slate-400" />
          <div className="mx-3 h-8 w-14 rounded bg-slate-400" />
          <div className="h-8 w-16 rounded bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
