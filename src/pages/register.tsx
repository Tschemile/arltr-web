import Link from 'next/link';
import React from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthLayout from '@/templates/AuthLayout';

export default function Register() {
  return (
    <AuthLayout>
      <div className="mt-4 text-center">
        <h2 className="mb-2 text-2xl font-medium">Create New Account</h2>
        <p>Login to manage your account.</p>
      </div>
      <form className="mt-8">
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Name</p>
          <Input
            placeholder="Full name"
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
          <p className="mb-2 text-lg font-medium">Email</p>
          <Input
            placeholder="name@example.com"
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            }
          />
        </div>
        <div className="my-4 grid grid-cols-2  gap-4">
          <div className="">
            <p className="mb-2 text-lg font-medium">Password</p>
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
          <div className="">
            <p className="mb-2 text-lg font-medium">Confirm Password</p>
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
        </div>
      </form>
      <div className="mt-8 flex items-center justify-between">
        <div>
          Don&apos;t have account{' '}
          <Link href="/login" className="text-gray-600 hover:border-none">
            Sign in
          </Link>
        </div>
        <Button>Get Started</Button>
      </div>
    </AuthLayout>
  );
}
