import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Logo from '@/assets/Logo.svg';
import { logOut } from '@/redux/features/auth/authSlice';
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
import Eye from '../Icons/Eye';
import Message from '../Icons/Message';
import PlusIcon from '../Icons/PlusIcon';
import Search from '../Icons/Search';

export default function Headers() {
  const dispatch = useAppDispatch();
  const { pathname, push } = useRouter();

  const {
    avatar = '',
    gender = '',
    domain = '',
    name = '',
  } = useAppSelector((state) => state.auth.currentUser);

  const [mode, setMode] = useState<
    'theme-default' | 'theme-dark' | 'theme-pink'
  >(
    (localStorage.getItem('theme') as
      | 'theme-default'
      | 'theme-dark'
      | 'theme-pink') || 'theme-default'
  );

  useEffect(() => {
    if (mode) {
      document.body.className = mode;
      localStorage.setItem('theme', mode);
    }
  }, [mode]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed z-20 h-[60px] w-full bg-tertiary-color py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {pathname.split('/')[1] !== 'user' && (
            <div
              className="mr-2 cursor-pointer xl:hidden"
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
          <Link
            className="hover:border-0"
            href="/"
            onClick={() => {
              if (pathname === '/') scrollToTop();
            }}
          >
            <Image src={Logo} width={40} alt="logo" />
          </Link>
        </div>
        <Input
          icons={<Search />}
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
            content={[
              {
                id: '1',
                title: name,
                handleClick: () => {
                  push(`/user/${domain}`);
                },
              },
              {
                id: '2',
                title: 'Log out',
                handleClick: () => {
                  localStorage.removeItem('token');
                  push('/login');
                  dispatch(logOut());
                },
              },
            ]}
          >
            <button className="h-10 w-10">
              <Avatar
                src={avatar}
                alt="avatar"
                className="m-auto h-full w-full rounded-full"
                gender={gender}
              />
            </button>
          </Dropdown>
          <Dropdown
            content={[
              {
                id: '1',
                title: '💡 Light Mode',
                handleClick: () => {
                  setMode('theme-default');
                },
              },
              {
                id: '2',
                title: '🕯️ Dark Mode',
                handleClick: () => {
                  setMode('theme-dark');
                },
              },
              {
                id: '3',
                title: '🫀 Pink Mode',
                handleClick: () => {
                  setMode('theme-pink');
                },
              },
            ]}
          >
            <IconButton className="h-10 w-10">
              <Eye />
            </IconButton>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
