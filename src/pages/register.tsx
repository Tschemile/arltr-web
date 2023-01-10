import Link from 'next/link';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Envelope from '@/components/Icons/Envelope';
import Lock from '@/components/Icons/Lock';
import User from '@/components/Icons/User';
import AuthLayout from '@/templates/AuthLayout';

export default function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    gender: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-medium">Create New Account</h2>
        <p>Login to manage your account.</p>
      </div>
      <form className="">
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
              placeholder="lastName"
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
            name="userName"
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
        <Button>Get Started</Button>
      </div>
    </AuthLayout>
  );
}
