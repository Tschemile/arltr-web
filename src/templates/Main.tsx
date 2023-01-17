import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import Headers from '@/components/Headers';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/redux/actions';
import { onHideNavbar } from '@/redux/features/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isShow = useAppSelector((state) => state.home.isShowNavbar);

  useEffect(() => {
    dispatch(getCurrentUser()).then((res: any) => {
      if (res.payload?.status !== 200) {
        router.push('/login');
      }
    });
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto text-gray-700 antialiased">
      {props.meta}
      <Headers />
      <div
        onClick={() => dispatch(onHideNavbar())}
        className={`${
          isShow ? 'cursor-pointer bg-[rgba(0,0,0,0.4)]' : 'bg-main'
        } z-40 mt-[60px] grid h-full w-full text-xl`}
      >
        <Navbar />
        <div className={`${isShow ? '-z-10' : ''} py-2 px-4 xl:pl-[320px]`}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { Main };
