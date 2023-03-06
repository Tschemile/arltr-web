import React from 'react';

export default function CommentsSkeleton() {
  return (
    <div className="w-full animate-pulse rounded bg-primary-color">
      {[...Array(2)].map((_, index) => (
        <div className="w-full" key={index}>
          <div className="flex py-2">
            <div className="mr-4 h-10 w-10 min-w-[40px] rounded-full bg-slate-400"></div>
            <div>
              <div>
                <div className="mb-2 h-6 w-40 rounded bg-slate-400"></div>
                <div className="h-6 w-60 rounded bg-slate-400"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
