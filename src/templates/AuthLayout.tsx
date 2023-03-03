import Image from 'next/dist/client/image';
import type { ReactNode } from 'react';
import React from 'react';

import Logo from '@/assets/Logo.svg';
import Polygon1 from '@/assets/Polygon1.svg';
import Polygon2 from '@/assets/Polygon2.svg';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  document.body.classList.add('theme-default');

  return (
    <div className="relative flex h-[100vh] w-full items-center justify-center bg-primary-color shadow-2xl">
      <div className="z-10 w-full overflow-hidden rounded-lg border border-solid shadow-lg sm:w-[65%] lg:h-[80vh]">
        <div className="lg:flex lg:h-full lg:items-center lg:justify-center">
          <div className=" hidden h-full w-full flex-col justify-between bg-secondary-color py-4 px-12 text-white lg:flex">
            <h1 className="mt-4 text-4xl xl:text-5xl">
              Connect to the virtual world!
            </h1>
            <div>
              <Image
                className="mx-auto rounded"
                src={Logo}
                width={200}
                alt="logo"
              />
            </div>
            <div />
          </div>
          <div className=" h-full w-full overflow-auto bg-tertiary-color px-12 py-4">
            {props.children}
          </div>
        </div>
      </div>
      <Image
        src={Polygon1}
        alt="polygon1"
        className="absolute bottom-0 left-0 z-0 w-1/4 lg:w-1/5"
      />
      <Image
        src={Polygon2}
        alt="polygon2"
        className="absolute top-0 right-0 z-0  w-1/4 lg:w-1/5"
      />
    </div>
  );
}
