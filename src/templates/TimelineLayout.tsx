import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Headers from '@/components/Headers';
import { getCurrentUser } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type ITimelineProps = {
  meta: ReactNode;
  children: ReactNode;
};

const TimelineLayout = (props: ITimelineProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isValid, setIsValid] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token'))
      setIsValid(true);
  }, []);

  useEffect(() => {
    if (Object.keys(currentUser).length === 0)
      dispatch(getCurrentUser()).then((res: any) => {
        if (res.payload?.status !== 200) {
          router.push('/login');
        }
      });
  }, [JSON.stringify(currentUser)]);

  if (isValid)
    return (
      <div className="h-full w-full overflow-y-auto text-gray-700 antialiased">
        {props.meta}
        <Headers />
        <div
          className="bg-main mt-[60px] grid h-full min-h-fit w-full bg-repeat-round text-xl"
          style={{
            backgroundImage:
              'url(https://www.kaartje2go.nl/wenskaarten/unicorn-kaart/img/unicorn-kaart.jpg)',
          }}
        >
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
