import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import Headers from '@/components/Headers';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/redux/actions';
import { useAppDispatch } from '@/redux/hooks';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then((res: any) => {
      if (res.payload?.data?.status !== 200) {
        router.push('/login');
      }
    });
  }, []);

  return (
    <div className=" h-full w-full overflow-y-auto text-gray-700 antialiased">
      {props.meta}
      <Headers />
      <div className="bg-main grid h-full w-full px-4 pt-[70px] pb-5 text-xl">
        <Navbar />
        <div className="pl-[320px]">{props.children}</div>
      </div>
    </div>
  );
};

export { Main };
