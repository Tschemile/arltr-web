import React from 'react';

import Carousels from '@/components/common/Carousels';
import PlusIcon from '@/components/Icons/PlusIcon';
import { useAppSelector } from '@/redux/hooks';

function StoryCarousels() {
  const { avatar = '' } = useAppSelector((state) => state.auth.currentUser);
  return (
    <>
      <Carousels childClassName="w-1/3 md:w-1/4 lg:w-1/5">
        {[
          <div
            key={0}
            className="relative m-1 min-h-[160px] cursor-pointer overflow-hidden rounded-lg shadow-lg hover:opacity-75"
          >
            <img
              src={avatar}
              className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-all hover:scale-125`}
              alt="image"
            />
            <PlusIcon
              className="absolute top-2 left-2 rounded-full bg-pink-500"
              color="pink"
            />
            <p className="absolute left-2 bottom-2 text-sm text-white">
              Only love
            </p>
          </div>,
          ...Array(10),
        ].map((x, index) => {
          if (index === 0) return x;

          return (
            <div
              key={index}
              className="relative m-1 min-h-[160px] cursor-pointer overflow-hidden rounded-lg shadow-lg hover:opacity-75"
            >
              <img
                src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
                className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-all hover:scale-125`}
                alt="image"
              />
              <div className="absolute top-2 left-2 rounded-full bg-pink-500 p-[14px] ring-1 ring-white" />
              <p className="absolute left-2 bottom-2 text-sm text-white">
                Your lover
              </p>
            </div>
          );
        })}
      </Carousels>
    </>
  );
}

export default StoryCarousels;
