import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Headers from '@/components/Headers';
import Sidebar from '@/components/Sidebar';
import { getCurrentUser } from '@/redux/actions';
import { onHideNavbar } from '@/redux/features/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isValid, setIsValid] = useState(false);

  const isShow = useAppSelector((state) => state.home.isShowNavbar);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [showBackTopButton, setShowBackTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setShowBackTopButton(true);
      } else {
        setShowBackTopButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      document.body.className =
        localStorage.getItem('theme') || 'theme-default';
      setIsValid(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(currentUser).length === 0)
      dispatch(getCurrentUser()).then((res: any) => {
        if (res.payload?.status !== 200) {
          router.push('/login');
        }
      });
  }, []);

  if (isValid)
    return (
      <div className="h-full w-full overflow-y-auto text-gray-700 antialiased">
        {props.meta}
        <Headers />
        <Sidebar />
        <div
          onClick={() => {
            if (isShow) dispatch(onHideNavbar());
          }}
          className={`${
            isShow ? 'cursor-pointer bg-[rgba(0,0,0,0.4)]' : 'bg-primary-color'
          } z-20 mt-[60px] grid h-full w-full text-xl`}
        >
          <div
            className={`${
              isShow ? '-z-10' : ''
            } min-h-[95vh] py-2 px-4 xl:pl-[320px] ${props.className}`}
          >
            {props.children}
          </div>
        </div>
        <Button
          onSubmit={scrollToTop}
          className={`fixed bottom-9 right-10 !block h-10 w-10 rounded-md transition-all duration-700 ${
            showBackTopButton ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          &#8679;
        </Button>
      </div>
    );
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-pink-500">
      Loading...<span className="animate-ping">💕</span>
    </div>
  );
};

export { Main };
