import type { ReactNode } from 'react';

import Headers from '@/components/Headers';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className=" text-gray-700 antialiased">
    {props.meta}
    <Headers />
    <div className="bg-main w-full px-4 pt-[70px] pb-5 text-xl">
      {props.children}
    </div>
  </div>
);

export { Main };
