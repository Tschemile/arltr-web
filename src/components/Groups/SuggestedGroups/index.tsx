import React from 'react';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Carousels from '@/components/common/Carousels';

export default function suggestedGroups() {
  return (
    <>
      <p className="my-4">Popular Groups</p>
      <Carousels childClassName="w-1/2 lg:w-1/3">
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
            className="mx-1 text-left"
            imgClassName="!min-h-[100px] cursor-pointer"
          >
            <h1>Group {index}</h1>
            <p className="text-sm">1 Members 50posts</p>
            <div className="my-1 flex items-center text-sm">
              <div className="mr-1 flex cursor-pointer -space-x-2 overflow-hidden">
                <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
              </div>
              See all Members
            </div>
            <div className="flex justify-between">
              <Button className="mr-1 h-8 w-full justify-center text-sm">
                Join
              </Button>
              <Button className="ml-1 h-8 w-full justify-center bg-gray-400 text-sm text-black">
                View
              </Button>
            </div>
          </Card>
        ))}
      </Carousels>
      <p className="mt-4">Categories</p>
      <p className="mb-4 text-sm">Find A Group By Browsing Top Categories</p>
      <Carousels childClassName="w-1/3 sm:w-1/4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="relative m-1 min-h-[120px] cursor-pointer overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
              className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover hover:scale-125`}
              alt="image"
            />
            <p className="absolute left-2 bottom-1 text-white">Animals</p>
          </div>
        ))}
      </Carousels>
      <p className="mt-4">Suggested Groups</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
            className="text-left hover:-translate-y-1"
            imgClassName="!min-h-[100px] cursor-pointer"
          >
            <h1>Group {index}</h1>
            <p className="text-sm">1 Members 50posts</p>
            <div className="my-1 flex items-center text-sm">
              <div className="mr-1 flex cursor-pointer -space-x-2 overflow-hidden">
                <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
              </div>
              See all Members
            </div>
            <div className="flex justify-between">
              <Button className="mr-1 h-8 w-full justify-center text-sm">
                Join
              </Button>
              <Button className="ml-1 h-8 w-full justify-center bg-gray-400 text-sm text-black">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
