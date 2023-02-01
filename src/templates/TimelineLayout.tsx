import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import Headers from '@/components/Headers';
import { getCurrentUser } from '@/redux/actions';
import { useAppDispatch } from '@/redux/hooks';

type ITimelineProps = {
  meta: ReactNode;
  children: ReactNode;
};

const TimelineLayout = (props: ITimelineProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then((res: any) => {
      if (res.payload?.status !== 200) {
        router.push('/login');
      }
    });
  }, []);

  if (typeof window !== 'undefined' && localStorage.getItem('token'))
    return (
      <div className="h-full w-full overflow-y-auto text-gray-700 antialiased">
        {props.meta}
        <Headers />
        <div className="bg-main mt-[60px] grid h-full w-full text-xl">
          {props.children}
        </div>
      </div>
    );
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-pink-500">
      Loading...<span className="animate-ping">💕</span>
    </div>
  );
};

export { TimelineLayout };
