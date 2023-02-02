import Link from 'next/link';
import router from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Envelope from '@/components/Icons/Envelope';
import Lock from '@/components/Icons/Lock';
import User from '@/components/Icons/User';
import { register } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AuthLayout from '@/templates/AuthLayout';

export default function Register() {
  const dispatch = useAppDispatch();
  const [dd, setDD] = useState('01');
  const [mm, setMM] = useState('01');
  const [yyyy, setYYYY] = useState('2000');
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    birth: '',
  });
  const isLoading = useAppSelector(
    (state) => state.auth.isLoading.loadingRegister
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    Object.assign(user, {
      birth: dd && mm && yyyy ? `${yyyy}-${mm}-${dd}` : '',
    });
    if (Object.values(user).every((x) => Boolean(x))) {
      dispatch(register(user)).then((result: any) => {
        if (result.payload?.status === 201) {
          router.push('/login');
        }
      });
    }
  };

  const optionsDD = [...Array(32).keys()]
    .filter((y) => y !== 0)
    .map((x) => {
      return {
        id: x,
        label: x < 10 ? `0${x}` : `${x}`,
        value: x < 10 ? `0${x}` : `${x}`,
      };
    });

  const optionsMM = [...Array(13).keys()]
    .filter((y) => y !== 0)
    .map((x) => {
      return {
        id: x,
        label: x < 10 ? `0${x}` : `${x}`,
        value: x < 10 ? `0${x}` : `${x}`,
      };
    });

  const optionsYYYY = [...Array(101).keys()].map((x) => {
    return {
      id: x,
      label: `${2023 - x}`,
      value: `${2023 - x}`,
    };
  });

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-medium">Create New Account</h2>
        <p>Login to manage your account.</p>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="">
            <p className="mb-2 text-lg font-medium">First Name</p>
            <Input
              placeholder="Enter first name"
              width="100%"
              name="firstName"
              onChange={handleChange}
              icons={<User />}
            />
          </div>
          <div className="">
            <p className="mb-2 text-lg font-medium">Last Name</p>
            <Input
              placeholder="Enter last name"
              width="100%"
              name="lastName"
              onChange={handleChange}
              icons={<User />}
            />
          </div>
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Email</p>
          <Input
            placeholder="name@example.com"
            width="100%"
            name="email"
            onChange={handleChange}
            icons={<Envelope />}
          />
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">User name</p>
          <Input
            placeholder="Enter user name"
            width="100%"
            onChange={handleChange}
            name="username"
            icons={<User />}
          />
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Password</p>
          <Input
            placeholder="******"
            width="100%"
            type="password"
            name="password"
            onChange={handleChange}
            icons={<Lock />}
          />
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Birthdays</p>
          <div className="my-4 grid grid-cols-3 gap-4">
            <Select
              name="dd"
              options={optionsDD as []}
              handleChange={(e) => setDD(e.target.value)}
            />
            <Select
              name="mm"
              options={optionsMM as []}
              handleChange={(e) => setMM(e.target.value)}
            />
            <Select
              name="yyyy"
              options={optionsYYYY as []}
              handleChange={(e) => setYYYY(e.target.value)}
            />
          </div>
        </div>
        <div className="my-4">
          <p className="mb-2 text-lg font-medium">Gender</p>
          <div className="flex items-center">
            <div className="pr-8">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              <label className="pl-2" htmlFor="male">
                Male
              </label>
            </div>
            <div className="pr-8">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              <label className="pl-2" htmlFor="female">
                Female
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                onChange={handleChange}
              />
              <label className="pl-2" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-between">
        <div>
          Don&apos;t have account{' '}
          <Link href="/login" className="text-gray-600 hover:border-none">
            Sign in
          </Link>
        </div>
        <Button loading={isLoading} onSubmit={handleSubmit}>
          Get Started
        </Button>
      </div>
    </AuthLayout>
  );
}
