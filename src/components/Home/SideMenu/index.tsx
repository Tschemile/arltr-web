import React from 'react';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Carousels from '@/components/common/Carousels';
import Divider from '@/components/common/Divider';

function SideMenu() {
  return (
    <div className="col-span-2 hidden h-fit p-2 shadow-lg md:block ">
      <div className="flex justify-between text-base">
        Trending! <a>👻</a>
      </div>

      <div className="my-2 flex flex-wrap space-x-2">
        {['#Love', '#Hot', '#LGBT', '#NTR'].map((x, index) => (
          <p
            className="rounded-full bg-slate-300 py-1 px-2 text-sm text-pink-700"
            key={index}
          >
            {x}
          </p>
        ))}
      </div>
      <Divider />

      <div className="flex justify-between text-base">
        Pro player <a>👻</a>
      </div>
      <Carousels numSlide={3}>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg text-sm shadow-lg "
          >
            <div className="relative m-1 min-h-[75px] overflow-hidden rounded-t-lg">
              <img
                src="https://i.pinimg.com/750x/f0/2e/b3/f02eb313f01083a0b4dd09943dc0c2fa.jpg"
                alt="image"
                className="absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover hover:scale-125"
              />
            </div>
            Blackpink
          </div>
        ))}
      </Carousels>
      <Divider />

      <div className="flex justify-between text-base">
        People you may know <a>👻</a>
      </div>
      {[...Array(5)].map((_, index) => (
        <div
          className="flex h-16 w-full items-center justify-between rounded px-3 py-2 hover:bg-pink-200"
          key={index}
        >
          <div className="inline-flex items-center space-x-2">
            <div>
              <Avatar
                alt="avatar"
                className="!h-[40px]"
                src="https://i.pinimg.com/originals/38/24/77/382477ef3cb63d1e18a45539064733aa.jpg"
              />
            </div>

            <p className="text-base">Rabbit</p>
          </div>

          <Button className="text-base">follow</Button>
        </div>
      ))}
      <Divider />

      <div className="flex justify-between text-base">
        People you may know <a>👻</a>
      </div>
      {[...Array(5)].map((_, index) => (
        <div
          className="flex h-16 w-full items-center justify-between rounded px-3 py-2 hover:bg-pink-200"
          key={index}
        >
          <div className="inline-flex items-center space-x-2">
            <div>
              <Avatar
                alt="avatar"
                className="!h-[40px]"
                src="https://i.pinimg.com/originals/38/24/77/382477ef3cb63d1e18a45539064733aa.jpg"
              />
            </div>

            <p className="text-base">Rabbit</p>
          </div>

          <Button className="text-base">follow</Button>
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
