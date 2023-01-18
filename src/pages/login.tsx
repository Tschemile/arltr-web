import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Lock from '@/components/Icons/Lock';
import User from '@/components/Icons/User';
import { login } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AuthLayout from '@/templates/AuthLayout';

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [infoUser, setInfoUser] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const isLoading = useAppSelector(
    (state) => state.auth.isLoading.loadingLogin
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInfoUser({ ...infoUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(login(infoUser)).then((res: any) => {
      if (res.payload?.status === 201) {
        router.push('/');
      }
    });
  };

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
            name="usernameOrEmail"
            icons={<User />}
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Password</p>
          <Input
            placeholder="*********"
            width="100%"
            type="password"
            name="password"
            onChange={handleChange}
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
        <Button loading={isLoading} onSubmit={handleSubmit}>
          Get Started
        </Button>
      </div>
    </AuthLayout>
  );
}
