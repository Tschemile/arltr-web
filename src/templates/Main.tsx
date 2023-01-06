import type { ReactNode } from 'react';

import Headers from '@/components/Headers';
import Navbar from '@/components/Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className=" h-full w-full overflow-y-auto text-gray-700 antialiased">
    {props.meta}
    <Headers />
    <div className="bg-main grid h-full w-full px-4 pt-[70px] pb-5 text-xl">
      <Navbar />
      <div className="pl-[320px]">{props.children}</div>
    </div>
  </div>
);

export { Main };
