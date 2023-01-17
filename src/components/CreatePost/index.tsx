import React from 'react';

import { useAppSelector } from '@/redux/hooks';

import ActionButton from '../common/ActionButton';
import Avatar from '../common/Avatar';
import Divider from '../common/Divider';
import Modal from '../common/Modal';
import Comment from '../Icons/Comment';

const listActions = [
  {
    id: 1,
    title: 'Go Live',
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
    title: 'Phote/Video',
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
    title: 'Tag Friend',
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

interface ICreatePost {
  openModal?: boolean;
  setContent?: (value: string) => void;
  onClose?: () => void;
  onSubmit?: () => void;
  setOpenModal?: (value: boolean) => void;
}

export default function CreatePost(props: ICreatePost) {
  const {
    openModal = false,
    setContent = () => {},
    onClose = () => {},
    onSubmit = () => {},
    setOpenModal = () => {},
  } = props;
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const {
    name = '' || undefined,
    gender = '' || undefined,
    avatar = '' || undefined,
  } = currentUser;

  const getContent = () => {
    return (
      <div>
        <>
          <div className="flex items-center">
            <div className="mr-4 h-[40px] w-[40px]">
              <Avatar
                src={avatar}
                alt="avatar"
                gender={gender}
                className="h-full w-full"
              />
            </div>
            <p className="font-medium">{name}</p>
          </div>
          <div className="my-4">
            <textarea
              className="h-full w-full resize-none py-1 outline-none placeholder:text-base placeholder:text-gray-500"
              placeholder={`What is your mind? ${name} !`}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </>
        <div className="my-4 flex items-center">
          <ActionButton icon={<Comment />} text="Comment" />
          <ActionButton icon={<Comment />} text="Comment" />
          <ActionButton icon={<Comment />} text="Comment" />
        </div>
      </div>
    );
  };

  return (
    <div className="mb-4 rounded-md bg-white p-4">
      <div className="flex items-center ">
        <div className="mr-4 h-[40px] w-[40px]">
          <Avatar
            src={avatar}
            alt="avatar"
            width={125}
            height={125}
            gender={gender}
            className="h-full w-full"
          />
        </div>
        <div
          className="w-full rounded-full bg-primary-color px-4 py-2 text-base text-gray-500 outline-none hover:cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          What is your mind? {name} !
        </div>
      </div>
      <Divider />
      <div className="flex">
        {listActions.map((x) => (
          <ActionButton
            icon={x.icon}
            key={x.id}
            text={x.title}
            iconClassname="rounded-full border-2 bg-primary-hover p-1"
          />
        ))}
      </div>
      <Modal
        title="Create New Post"
        textSubmitButton="Post"
        showModal={openModal}
        content={getContent()}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}
