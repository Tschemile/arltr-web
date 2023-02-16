import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useState } from 'react';

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
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const isLoading = useAppSelector(
    (state) => state.auth.isLoading.loadingLogin
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInfoUser({ ...infoUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(infoUser).every((x) => Boolean(x))) {
      if (isRemember) {
        localStorage.setItem('yourAccount', JSON.stringify(infoUser));
      } else {
        localStorage.removeItem('yourAccount');
      }
      dispatch(login(infoUser)).then((res: any) => {
        if (res.payload?.status === 201) {
          router.push('/');
        }
      });
    }
  };

  useEffect(() => {
    const yourAccount = localStorage.getItem('yourAccount');
    if (yourAccount) {
      setInfoUser(JSON.parse(yourAccount));
      setIsRemember(true);
    }
  }, []);

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="">
        <div className="my-12 text-center lg:my-24">
          <h2 className="mb-2 text-3xl font-medium">Welcome to Roma</h2>
          <i>Login to manage your account.</i>
        </div>
        <div>
          <div className="my-4">
            <p className="mb-2 text-lg font-medium">Email or User name</p>
            <Input
              placeholder="Enter email or user name"
              width="100%"
              name="usernameOrEmail"
              icons={<User />}
              onChange={handleChange}
              value={infoUser.usernameOrEmail}
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
              value={infoUser.password}
            />
          </div>
        </div>
        <div className="my-4 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={isRemember}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsRemember(e.target.checked)
              }
            />
            <label className="cursor-pointer pl-2" htmlFor="remember">
              Remember me
            </label>
          </div>
          <i>
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:border-none"
            >
              Forgot password
            </Link>
          </i>
        </div>
        <Button
          className="my-4 w-full justify-center !rounded-full !bg-primary-backgroundColor py-2"
          loading={isLoading}
          onSubmit={handleSubmit}
        >
          Login
        </Button>
        <div className="text-center">
          Don&apos;t have account?{' '}
          <Link href="/register" className="text-blue-500 hover:border-none">
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
