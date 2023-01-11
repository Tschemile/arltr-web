import { useState } from 'react';

import Avatar from '@/components/common/Avatar';
import Tabs from '@/components/common/Tabs';
import BulletList from '@/components/Icons/BulletList';
import Camera from '@/components/Icons/Camera';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import PlusIcon from '@/components/Icons/PlusIcon';
import { Meta } from '@/layouts/Meta';
import { TimelineLayout } from '@/templates/TimelineLayout';

const User = () => {
  const [active, setIsActive] = useState('1');

  const options = [
    {
      key: '1',
      title: 'Timeline',
      content: 'Test tab 1',
    },
    {
      key: '2',
      title: 'About',
      content: 'Test tab 2',
    },
    {
      key: '3',
      title: 'Friend',
      content: 'Test tab 3',
    },
    {
      key: '4',
      title: 'Photoes',
      content: 'hihi',
    },
    {
      key: '4',
      title: 'Videos',
      content: 'hihi',
    },
  ];
  return (
    <TimelineLayout meta={<Meta title="Bé ơi" description="Bé ơi" />}>
      <div className="mb-0 p-0">
        <div className="relative max-h-full min-h-[285px]">
          <img
            src="https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/mejores-animes-temporada-primavera-2022.jpg?fit=1280%2C720&quality=80&ssl=1"
            alt=""
            className="absolute top-1/2 right-0 bottom-0 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          />

          <a
            href="#"
            className="absolute bottom-2 right-3 z-[3] flex items-center rounded-md bg-white px-2 py-1 text-sm text-black"
          >
            <Camera width={24} /> Edit
          </a>
        </div>

        <div className="relative z-[2] -mt-24 mb-4 text-center">
          <div className="mb-2">
            <Avatar
              src="https://ichef.bbci.co.uk/news/976/cpsprodpb/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg"
              alt="avatar"
              width="125px"
              height="125px"
              className="m-auto border-[3px] border-solid border-white"
            />
            <a
              href="#"
              className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white text-black"
            >
              <Camera />
            </a>
          </div>
          <div className="">
            <h1 className="text-3xl"> Bé ơi </h1>
            <p className="text-sm">
              Family , Food , Fashion , Fourever <a href="#">Edit </a>
            </p>
          </div>
        </div>

        <div className="sticky flex flex-row-reverse items-center justify-between border-y-[1px] border-gray-400 py-1 text-sm">
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center rounded-md bg-blue-600 py-1 px-2 text-white"
            >
              <PlusIcon /> Add your story
            </a>
            <a href="#" className="ml-1 flex rounded-md bg-gray-300 py-1 px-2">
              <BulletList />
            </a>
            <div className="group flex flex-col">
              <a
                href="#"
                className="ml-1 flex rounded-md bg-gray-300 py-1 px-2"
              >
                <EllipsisHorizon />
              </a>
              <div>
                <ul className="absolute z-[2] hidden w-52 bg-white p-2 group-hover:block">
                  <li>
                    <a href="#"> View as guast </a>
                  </li>
                  <li>
                    <a href="#"> Block this person </a>
                  </li>
                  <li>
                    <a href="#"> Report abuse</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex">
            <Tabs
              options={options}
              defaultKey={active}
              handleChange={(key) => setIsActive(key)}
            />
            <div className="group">
              <a href="#" className="">
                More
              </a>
              <div className="absolute z-[2] hidden w-44 bg-white p-2 group-hover:block">
                <ul className="">
                  <li>
                    <a href="#">Moves</a>
                  </li>
                  <li>
                    <a href="#">Likes</a>
                  </li>
                  <li>
                    <a href="#">Events</a>
                  </li>
                  <li>
                    <a href="#">Groups</a>
                  </li>
                  <li>
                    <a href="#">Gallery</a>
                  </li>
                  <li>
                    <a href="#">Sports</a>
                  </li>
                  <li>
                    <a href="#">Gallery</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
    </TimelineLayout>
  );
};

export default User;
