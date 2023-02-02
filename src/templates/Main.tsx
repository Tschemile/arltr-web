import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

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

  const [isValid, setIsValid] = useState(false);

  const isShow = useAppSelector((state) => state.home.isShowNavbar);

  useEffect(() => {
    dispatch(getCurrentUser()).then((res: any) => {
      if (res.payload?.status !== 200) {
        router.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token'))
      setIsValid(true);
  }, []);

  if (isValid)
    return (
      <div className="h-full w-full overflow-y-auto text-gray-700 antialiased">
        {props.meta}
        <Headers />
        <div
          onClick={() => {
            if (isShow) dispatch(onHideNavbar());
          }}
          className={`${
            isShow ? 'cursor-pointer bg-[rgba(0,0,0,0.4)]' : 'bg-main'
          } z-40 mt-[60px] grid h-full w-full text-xl`}
        >
          <Navbar />
          <div
            className={`${
              isShow ? '-z-10' : ''
            } min-h-[95vh] py-2 px-4 xl:pl-[320px]`}
          >
            {props.children}
          </div>
        </div>
      </div>
    );
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-pink-500">
      Loading...<span className="animate-ping">💕</span>
    </div>
  );
};

export { Main };
