import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Logo from '@/assets/Logo.svg';
import { onShowNavbar } from '@/redux/features/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import IconButton from '../common/IconButton';
import Input from '../common/Input';
import Tooltip from '../common/Tooltip';
import Bars from '../Icons/Bars';
import BarsBottomLeft from '../Icons/BarsBottomLeft';
import Bell from '../Icons/Bell';
import Message from '../Icons/Message';
import PlusIcon from '../Icons/PlusIcon';

export default function Headers() {
  const dispatch = useAppDispatch();
  const { pathname, push } = useRouter();
  const [open, setOpen] = useState(false);

  const {
    avatar = '',
    gender = '',
    domain = '',
    name = '',
  } = useAppSelector((state) => state.auth.currentUser);

  return (
    <div className="fixed z-20 h-[60px] w-full bg-pink-400 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {pathname.split('/')[1] !== 'user' && (
            <div
              className="mr-2 xl:hidden"
              onClick={() => dispatch(onShowNavbar())}
            >
              <div className="peer transition duration-200 hover:hidden">
                <BarsBottomLeft />
              </div>
              <div className="hidden transition duration-200 ease-in-out peer-hover:block">
                <Bars />
              </div>
            </div>
          )}
          <Link className="hover:border-0" href="/">
            <Image src={Logo} width={40} alt="logo" />
          </Link>
        </div>
        <Input
          icons={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          }
          placeholder="Search for Friends, Videos and more..."
          width="550px"
          className="hidden xl:block"
        />
        <div className="flex items-center">
          <IconButton>
            <Tooltip description="Create">
              <PlusIcon />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip description="Messages">
              <Message />
            </Tooltip>
          </IconButton>
          <IconButton className="mr-4">
            <Tooltip description="Notifications">
              <Bell />
            </Tooltip>
          </IconButton>
          <Dropdown
            open={open}
            content={[
              {
                id: '1',
                title: `${name}`,
                handleClick: () => {
                  push(`/user/${domain}`);
                },
              },
              {
                id: '2',
                title: 'Log out',
                handleCLick: () => {
                  localStorage.removeItem('token');
                  push('/login');
                },
              },
            ]}
          >
            <div
              className="h-10 w-10 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <Avatar
                src={avatar}
                alt="avatar"
                className="m-auto h-full w-full rounded-full"
                gender={gender}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
