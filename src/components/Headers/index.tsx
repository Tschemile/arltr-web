import React from 'react';
import IconButton from '../common/IconButton';

import Input from '../common/Input';
import ArrowDown from '../Icons/ArrowDown';
import Bell from '../Icons/Bell';
import Message from '../Icons/Message';
import PlusIcon from '../Icons/PlusIcon';

export default function Headers() {
  return (
    <div className="fixed h-[60px] w-full bg-white py-2 px-4">
      <div className="flex items-center justify-between">
        <img
          src="https://i.pinimg.com/originals/0e/50/39/0e503918829c61bd24803ce064546cee.jpg"
          width={36}
          alt="logo"
        />
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
        />
        <div>
          <IconButton>
            <PlusIcon />
          </IconButton>
          <IconButton>
           <Message />
          </IconButton>
          <IconButton>
            <Bell />
          </IconButton>
          <IconButton>
           <ArrowDown />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
