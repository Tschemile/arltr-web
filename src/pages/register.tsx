import { useFormik } from 'formik';
import Link from 'next/link';
import router from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Envelope from '@/components/Icons/Envelope';
import Lock from '@/components/Icons/Lock';
import User from '@/components/Icons/User';
import { register } from '@/redux/actions';
import { getEmailRegister } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AuthLayout from '@/templates/AuthLayout';

export default function Register() {
  const dispatch = useAppDispatch();
  const [birth, setBirth] = useState({
    dd: '01',
    mm: '01',
    yyyy: '1998',
  });

  const isLoading = useAppSelector(
    (state) => state.auth.isLoading.loadingRegister
  );

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      gender: 'male',
      birth: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      username: Yup.string().required('User name is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must have at least 6 characters')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&(){}^<>|;'"-+=])[A-Za-z\d@$!%*#?&(){}^<>|;'"-+=]{0,}$/,
          'Password too weak'
        ),
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: (user) => {
      Object.assign(user, {
        birth: birth ? `${birth.yyyy}-${birth.mm}-${birth.dd}` : '',
      });
      if (user.email) {
        dispatch(getEmailRegister(user.email));
      }

      dispatch(register(user)).then((result: any) => {
        if (result.payload?.status === 201) {
          router.push('/verify-email');
          toast.info(result.payload.data.message);
        }
      });
    },
  });

  const handleChangeBirth = (e: ChangeEvent<HTMLSelectElement>): void => {
    setBirth({ ...birth, [e.target.name]: e.target.value });
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

  const { errors = {}, submitCount = 0 } = formik;
  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-medium">Welcome to Roma</h2>
          <i>Create an account</i>
        </div>
        <div>
          <div className="my-2 grid grid-cols-2 gap-4">
            <div className="">
              <p className="mb-2 text-lg font-medium">First Name</p>
              <Input
                placeholder="Enter first name"
                width="100%"
                name="firstName"
                onChange={formik.handleChange}
                icons={<User />}
                value={formik.values.firstName}
              />
              {errors.firstName && submitCount > 0 && (
                <p className="mt-4 text-red-500">*{errors.firstName}</p>
              )}
            </div>
            <div className="">
              <p className="mb-2 text-lg font-medium">Last Name</p>
              <Input
                placeholder="Enter last name"
                width="100%"
                name="lastName"
                onChange={formik.handleChange}
                icons={<User />}
                value={formik.values.lastName}
              />
              {errors.lastName && submitCount > 0 && (
                <p className="mt-4 text-red-500">*{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="my-2">
            <p className="mb-2 text-lg font-medium">Email</p>
            <Input
              placeholder="name@example.com"
              width="100%"
              name="email"
              onChange={formik.handleChange}
              icons={<Envelope />}
              value={formik.values.email}
            />
            {errors.email && submitCount > 0 && (
              <p className="mt-4 text-red-500">*{errors.email}</p>
            )}
          </div>
          <div className="my-2">
            <p className="mb-2 text-lg font-medium">User name</p>
            <Input
              placeholder="Enter user name"
              width="100%"
              onChange={formik.handleChange}
              name="username"
              icons={<User />}
              value={formik.values.username}
            />
            {errors.username && submitCount > 0 && (
              <p className="mt-4 text-red-500">*{errors.username}</p>
            )}
          </div>
          <div className="my-2">
            <p className="mb-2 text-lg font-medium">Password</p>
            <Input
              placeholder="******"
              width="100%"
              type="password"
              name="password"
              onChange={formik.handleChange}
              icons={<Lock />}
              value={formik.values.password}
            />
            {errors.password && submitCount > 0 && (
              <p className="mt-4 text-red-500">*{errors.password}</p>
            )}
          </div>
          <div className="my-2">
            <p className="mb-2 text-lg font-medium">Birthdays</p>
            <div className="my-4 grid grid-cols-3 gap-4">
              <Select
                name="dd"
                options={optionsDD as []}
                defaultValue={birth.dd}
                handleChange={handleChangeBirth}
              />
              <Select
                name="mm"
                options={optionsMM as []}
                defaultValue={birth.mm}
                handleChange={handleChangeBirth}
              />
              <Select
                name="yyyy"
                defaultValue={birth.yyyy}
                options={optionsYYYY as []}
                handleChange={handleChangeBirth}
              />
            </div>
          </div>
          <div className="my-2 flex items-center justify-between">
            <p className="text-lg font-medium">Gender</p>
            <div className="">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formik.values.gender === 'male'}
                onChange={formik.handleChange}
              />
              <label className="pl-2" htmlFor="male">
                Male
              </label>
            </div>
            <div className="">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formik.values.gender === 'female'}
                onChange={formik.handleChange}
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
                checked={formik.values.gender === 'other'}
                value="other"
                onChange={formik.handleChange}
              />
              <label className="pl-2" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <Button
          className="my-4 !block w-full !rounded-full !bg-primary-backgroundColor py-2"
          loading={isLoading}
          onSubmit={formik.handleSubmit}
          type="submit"
        >
          Register
        </Button>
        <div className="text-center">
          Already an account?{' '}
          <Link href="/login" className="text-blue-500 hover:border-none">
            Login now
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
