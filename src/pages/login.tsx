import Link from 'next/link';
import React from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Lock from '@/components/Icons/Lock';
import User from '@/components/Icons/User';
import AuthLayout from '@/templates/AuthLayout';

export default function Login() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-medium">Welcome Back</h2>
        <p>Login to manage your account.</p>
      </div>
      <form className="">
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Email or User name</p>
          <Input
            placeholder="Enter email or user name"
            width="100%"
            icons={<User />}
          />
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Password</p>
          <Input
            placeholder="*********"
            width="100%"
            type="password"
            icons={<Lock />}
          />
        </div>
      </form>
      <div className="flex items-center justify-between">
        <div>
          Don&apos;t have account{' '}
          <Link href="/register" className="text-gray-600 hover:border-none">
            Sign up
          </Link>
        </div>
        <Button>Get Started</Button>
      </div>
    </AuthLayout>
  );
}
