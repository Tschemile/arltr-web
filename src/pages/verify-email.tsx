import router from 'next/router';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import OTPInput from '@/components/common/OPTInput';
import { Meta } from '@/layouts/Meta';
import { resendOTPCode, verifyOTPCode } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AuthLayout from '@/templates/AuthLayout';

export default function VerifyEmail() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.emailRegister);
  const [otpCode, setOTPCode] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      dispatch(verifyOTPCode({ code: otpCode }));
    }
  };

  const handleResendOTP = () => {
    dispatch(resendOTPCode({ email }));
  };

  useEffect(() => {
    if (!email) router.push('/register');
  }, []);

  return (
    <AuthLayout
      meta={<Meta title="Verify | Roma" description="Verify | Roma" />}
    >
      <form onSubmit={(e) => handleSubmit(e)} className="">
        <div className="my-12 px-4 text-center lg:my-24 xl:px-12">
          <h2 className="mb-2 text-3xl font-medium">Welcome to Roma</h2>
          <i>Please enter your One-Time-Password to verify your account.</i>
        </div>
        <div className="pt-[20%]">
          <div className="px-8 xl:px-12">
            <OTPInput
              autoFocus
              isNumberInput
              length={6}
              className="flex items-center gap-4"
              inputClassName="border-b border-b-4 border-b-[#DDDDDD] w-[calc(100%/6)] focus-visible:outline-none text-3xl text-center"
              onChangeOTP={(otp) => setOTPCode(otp)}
              setOTPCode={setOTPCode}
            />
          </div>
          <Button
            className="mt-12 mb-4 !block w-full !rounded-full !bg-secondary-color py-2"
            // loading={isLoading}
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
          <div className="cursor-pointer text-center">
            <p className="text-blue-500 hover:border-none">
              <span onClick={handleResendOTP}>Resend One-Time-Password</span>
            </p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
