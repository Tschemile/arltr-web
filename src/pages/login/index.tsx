import React from 'react';

import Input from '@/components/common/Input';

export default function Login() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="w-[70%] rounded-lg border	 border-solid border-zinc-500">
        <div className="flex items-center justify-center">
          <div className="my-auto h-full w-full bg-gradient-to-tr from-[#78a6fc] to-[#3576ef] px-12 text-center">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJc5GL_L0h_lh6Tmf3mYsCrhywKwJKKVm2Fw&usqp=CAU"
                alt="bg"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <h3>Fortune</h3>
            <p>Contact your friends and family</p>
          </div>
          <div className="h-full w-full px-12">
            <div className="text-center">
              <h2>Welcome Back</h2>
              <p>Login to manage your account.</p>
            </div>
            <form className="mt-8">
              <div className="my-4">
                <p className="mb-2">Email</p>
                <Input
                  placeholder="name@example.com"
                  width="100%"
                  icons={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="my-4">
                <p className="mb-2">Password</p>
                <Input
                  placeholder="*********"
                  width="100%"
                  type="password"
                  icons={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="my-4">
                <p className="mb-2">Confirm Password</p>
                <Input
                  placeholder="*********"
                  width="100%"
                  type="password"
                  icons={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  }
                />
              </div>
            </form>
            <div className="mt-8 flex items-center justify-between">
              <div>
                Don&apos;t have account<span>Sign up</span>
              </div>
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
