import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

import Avatar from '../common/Avatar';
import Divider from '../common/Divider';
import ArrowDown from '../Icons/ArrowDown';
import ArrowUp from '../Icons/ArrowUp';
import Group from '../Icons/Group';
import { Sidebar } from '../Skeleton';

const listMenu = [
  {
    id: 1,
    title: 'News Feed',
    link: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Albums',
    link: 'albums',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Explore',
    link: 'explore',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Groups',
    link: 'groups',
    icon: <Group width={16} className="!p-0" />,
  },
  {
    id: 5,
    title: 'Pages',
    link: 'pages',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Fundings',
    link: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    ),
  },
];

const listExplore = [
  {
    id: 1,
    title: 'Market',
    link: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Forum',
    link: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Events',
    link: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Jobs',
    link: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    ),
  },
];

export default function Navbar() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(4);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const loadingCurrentUser = useAppSelector(
    (state) => state.auth.isLoading.loadingCurrentUser
  );
  const isShow = useAppSelector((state) => state.home.isShowNavbar);

  const { avatar = '', name = '', gender = '', domain = '' } = currentUser;
  return (
    <div
      className={`fixed top-[60px] h-[calc(100vh-60px)] w-[300px] ${
        !isShow ? '-translate-x-full' : 'translate-x-0'
      } z-50 overflow-y-auto overscroll-contain bg-white py-2 px-4 transition-all duration-200 ease-in-out xl:block xl:translate-x-0`}
    >
      {loadingCurrentUser ? (
        <Sidebar />
      ) : (
        <>
          <button
            className="nav-item"
            onClick={() => router.push(`/user/${domain}`)}
          >
            <div className="mr-4 h-[40px] w-[40px]">
              <Avatar
                src={avatar}
                gender={gender}
                alt="avatar"
                className="h-full w-full"
              />
            </div>
            <p>{name}</p>
          </button>
          <div className="my-4">
            {listMenu.slice(0, isVisible).map((x) => (
              <button
                className="nav-item mb-2"
                key={x.id}
                onClick={() => router.push(`/${x.link}`)}
              >
                <span className="rounded-full border-2 bg-primary-hover p-2">
                  {x.icon}
                </span>
                <p className="pl-3 text-base font-medium">{x.title}</p>
              </button>
            ))}
            <button
              className="nav-item"
              onClick={() => setIsVisible(isVisible <= 4 ? listMenu.length : 4)}
            >
              <span className="rounded-full border-2 bg-primary-hover p-2">
                {isVisible <= 4 ? (
                  <ArrowDown width={18} />
                ) : (
                  <ArrowUp width={18} />
                )}
              </span>

              <p className="pl-3 text-base font-bold">
                See {isVisible <= 4 ? 'all' : 'less'}
              </p>
            </button>
          </div>
          <Divider />
          <h4 className="text-lg font-medium">Explore</h4>
          <div className="my-4">
            {listExplore.map((x) => (
              <button className="nav-item mb-2" key={x.id}>
                <span className="rounded-full border-2 bg-primary-hover p-2">
                  {x.icon}
                </span>
                <p className="pl-3 text-base font-medium">{x.title}</p>
              </button>
            ))}
          </div>
          <hr className="my-4 border-primary-border" />
          <div className="text-sm">
            <div className="my-2">
              <p>About Us</p>
              <p>Blog</p>
              <p>Contact Us</p>
              <p>Privacy Policy</p>
              <p>Developers</p>
              <p>Temp - Conditions</p>
            </div>
            <p>
              © 2023 <strong>Iu be ❤</strong>. All Rights Reserved.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
