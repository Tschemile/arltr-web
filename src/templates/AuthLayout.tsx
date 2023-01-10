import type { ReactNode } from 'react';
import React from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className=" w-full overflow-hidden rounded-lg border border-solid shadow-lg sm:w-[65%] lg:h-[70%]">
        <div className="lg:flex lg:h-full lg:items-center lg:justify-center">
          <div className="w-full bg-gradient-to-tr from-[#78a6fc] to-[#3576ef] py-4 px-12 text-center text-white lg:flex lg:h-full lg:flex-col lg:justify-center">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJc5GL_L0h_lh6Tmf3mYsCrhywKwJKKVm2Fw&usqp=CAU"
                alt="bg"
                width={80}
                height={80}
                className="mx-auto rounded"
              />
            </div>
            <h1 className="my-3 text-2xl">Fortune</h1>
            <p className="text-gray-300">Contact your friends and family</p>
          </div>
          <div className="flex h-full w-full flex-col justify-around px-12 py-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
