import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Album from '@/assets/Album.png';
import Courses from '@/assets/Courses.svg';
import Event from '@/assets/Event.svg';
import Forum from '@/assets/Forum.svg';
import Friends from '@/assets/Friends.svg';
import Groups from '@/assets/Groups.svg';
import Home from '@/assets/Home.svg';
import Jobs from '@/assets/Jobs.svg';
import Packages from '@/assets/Packages.svg';
import Pages from '@/assets/Pages.svg';
import Settings from '@/assets/Settings.svg';
import Shop from '@/assets/Shop.svg';
import { useAppSelector } from '@/redux/hooks';

import Avatar from '../common/Avatar';
import Divider from '../common/Divider';
import ArrowDown from '../Icons/ArrowDown';
import SidebarSkeleton from '../Skeleton/SidebarSkeleton';

const listMenu = [
  {
    id: 1,
    title: 'Home',
    link: '/',
    icon: <Image width={25} src={Home} alt="home-icon" />,
  },
  {
    id: 2,
    title: 'Albums',
    link: 'albums',
    icon: <Image width={25} src={Album} alt="album-icon" />,
  },
  {
    id: 3,
    title: 'Friends',
    link: 'friends',
    icon: <Image width={25} src={Friends} alt="friends-icon" />,
  },
  {
    id: 4,
    title: 'Groups',
    link: 'groups',
    icon: <Image width={25} src={Groups} alt="groups-icon" />,
  },
  {
    id: 5,
    title: 'Pages',
    link: 'pages',
    icon: <Image width={25} src={Pages} alt="pages-icon" />,
  },
  {
    id: 6,
    title: 'Event',
    link: 'event',
    icon: <Image width={25} src={Event} alt="event-icon" />,
  },
];

const listExplore = [
  {
    id: 1,
    title: 'Shop',
    link: 'shop',
    icon: <Image width={25} src={Shop} alt="shop-icon" />,
  },
  {
    id: 2,
    title: 'Forum',
    link: 'forum',
    icon: <Image width={25} src={Forum} alt="forum-icon" />,
  },
  {
    id: 3,
    title: 'Courses',
    link: 'courses',
    icon: <Image width={25} src={Courses} alt="courses-icon" />,
  },
  {
    id: 4,
    title: 'Jobs',
    link: 'jobs',
    icon: <Image width={25} src={Jobs} alt="jobs-icon" />,
  },
  {
    id: 5,
    title: 'Packages',
    link: 'packages',
    icon: <Image width={25} src={Packages} alt="Packages-icon" />,
  },
  {
    id: 6,
    title: 'Setting',
    link: 'setting',
    icon: <Image width={25} src={Settings} alt="settings-icon" />,
  },
];

export default function Sidebar() {
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
      } no-scrollbar z-30 overflow-y-auto overscroll-contain bg-primary-color py-2 px-4 text-black transition-all duration-200 ease-in-out xl:block xl:translate-x-0`}
    >
      {loadingCurrentUser ? (
        <SidebarSkeleton />
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
                className="nav-item"
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
              className="nav-item transition-all"
              style={{
                transform: `translateY(${isVisible <= 4 ? '0' : ''})`,
              }}
              onClick={() => setIsVisible(isVisible <= 4 ? listMenu.length : 4)}
            >
              <span
                className={`rounded-full border-2 bg-primary-hover p-2 transition-all duration-500 ${
                  isVisible <= 4 ? '' : 'rotate-180'
                }`}
              >
                <ArrowDown width={25} />
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
              © 2023 <strong>Roma</strong>. All Rights Reserved.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
