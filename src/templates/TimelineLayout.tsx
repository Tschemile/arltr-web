import type { ReactNode } from 'react';

import Headers from '@/components/Headers';

type ITimelineProps = {
  meta: ReactNode;
  children: ReactNode;
};

const TimelineLayout = (props: ITimelineProps) => (
  <div className=" h-full w-full overflow-y-auto text-gray-700 antialiased">
    {props.meta}
    <Headers />
    <div className="bg-main grid h-full w-full px-4 pt-[70px] pb-5 text-xl">
      <div className="lg:mx-[20%]">{props.children}</div>
    </div>
  </div>
);

export { TimelineLayout };
