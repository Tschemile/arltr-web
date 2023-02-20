import type { ChangeEvent, FormEvent } from 'react';
import React from 'react';

import Avatar from '@/components/common/Avatar';
import UploadButton from '@/components/common/UploadButton';
import Chain from '@/components/Icons/Chain';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Smite from '@/components/Icons/Smite';
import { useAppSelector } from '@/redux/hooks';

interface ICommentForm {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  contentCmt?: string;
  refs?: any;
  handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

export default function CommentForm(props: ICommentForm) {
  const {
    onSubmit = () => {},
    onChange = () => {},
    contentCmt = '',
    refs = {},
    handleChangeFile = () => {},
    id = '',
  } = props;

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <div className="flex items-center py-3">
      <div className="mr-4 h-[40px] w-[40px]">
        <Avatar
          src={currentUser.avatar}
          alt="avatar"
          className="m-auto h-full w-full rounded-full"
        />
      </div>
      <form
        onSubmit={onSubmit}
        className="flex w-full items-center justify-between rounded-full bg-primary-color px-4"
      >
        <input
          placeholder="Write comment here..."
          value={contentCmt}
          ref={refs}
          onChange={onChange}
          className="w-full bg-primary-color p-2 text-sm outline-none placeholder:text-sm placeholder:text-gray-500"
        />
        <ul className="flex items-center">
          <li className="cursor-pointer">
            <UploadButton
              className="cursor-pointer"
              id={id}
              handleChange={handleChangeFile}
            >
              <Chain />
            </UploadButton>
          </li>
          <li className="cursor-pointer">
            <Smite />
          </li>
          <li className="cursor-pointer">
            <EllipsisHorizon />
          </li>
        </ul>
      </form>
    </div>
  );
}
