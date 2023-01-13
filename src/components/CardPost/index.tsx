import type { ReactNode } from 'react';
import React from 'react';

import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Like from '@/components/Icons/Like';

import Avatar from '../common/Avatar';
import Divider from '../common/Divider';
import IconButton from '../common/IconButton';

interface CardPostProps {
  children: ReactNode;
  img?: string;
}

export default function CardPost(props: CardPostProps) {
  const { img = '' } = props;
  return (
    <div className={`mb-4 rounded-lg bg-white px-4 shadow-lg`}>
      <div className="flex justify-between">
        <div className="flex items-center py-2">
          <div className="mr-4">
            <Avatar
              src="https://phunuvietnam.mediacdn.vn/179072216278405120/2022/11/4/edogawa-conan--166754179290680712885.jpg"
              alt="avatar"
              width={50}
              className="m-auto border-[3px] border-solid border-white"
            />
          </div>
          <div className="">
            <h3 className="text-lg font-medium">Stella Johnson</h3>
            <p className="text-sm">5 hrs</p>
          </div>
        </div>
        <EllipsisHorizon />
      </div>
      <div className="py-2">{props.children}</div>
      {!!img && (
        <div className="relative max-h-[185px] min-h-[300px] overflow-hidden rounded">
          <img
            src={img}
            alt="image"
            className="absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>
      )}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center">
          <IconButton className="ml-0 mr-1 p-0">
            <Like width={22} color="blue" />
          </IconButton>
          <span className="text-sm">13</span>
        </div>
        <div>
          <span className="pr-1">24</span>
          <span>Comment</span>
        </div>
      </div>
      <Divider />
      <div className="-my-3 flex">
        <button className="nav-item justify-center">
          <span className="">
            <Like />
          </span>
          <p className="whitespace-nowrap pl-2 text-base text-[#929292]">
            Like
          </p>
        </button>
        <button className="nav-item justify-center">
          <span className="">
            <Like />
          </span>
          <p className="whitespace-nowrap pl-2 text-base text-[#929292]">
            Comment
          </p>
        </button>
      </div>
      <Divider />
      <div className="cursor-pointer text-sm underline opacity-50 hover:opacity-100">
        View more
      </div>
      <div className="flex py-2">
        <div className="mr-4">
          <Avatar
            src="https://phunuvietnam.mediacdn.vn/179072216278405120/2022/11/4/edogawa-conan--166754179290680712885.jpg"
            alt="avatar"
            width={50}
            className="m-auto border-[3px] border-solid border-white"
          />
        </div>
        <div className="relative w-full rounded-lg bg-primary-color p-2 after:absolute after:top-3 after:-left-5 after:border-[10px] after:border-transparent after:border-r-primary-color">
          <h3 className="text-lg font-medium">Stella Johnson</h3>
          <p className="text-sm">
            If you want to see the sun, you must be go through rainy days
          </p>
        </div>
        <EllipsisHorizon />
      </div>
      <div className="flex py-2">
        <div className="mr-4">
          <Avatar
            src="https://phunuvietnam.mediacdn.vn/179072216278405120/2022/11/4/edogawa-conan--166754179290680712885.jpg"
            alt="avatar"
            width={50}
            className="m-auto border-[3px] border-solid border-white"
          />
        </div>
        <div className="relative w-full rounded-lg bg-primary-color p-2 after:absolute after:top-3 after:-left-5 after:border-[10px] after:border-transparent after:border-r-primary-color">
          <h3 className="text-lg font-medium">Stella Johnson</h3>
          <p className="text-sm">I love you so much</p>
        </div>
        <EllipsisHorizon />
      </div>
    </div>
  );
}
