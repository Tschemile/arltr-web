import type { ChangeEvent } from 'react';
import React from 'react';

import ActionButton from '@/components/common/ActionButton';
import Avatar from '@/components/common/Avatar';
import Select from '@/components/common/Select';
import UploadButton from '@/components/common/UploadButton';
import Comment from '@/components/Icons/Comment';
import { useAppSelector } from '@/redux/hooks';

interface IContentModal {
  handleSelect?: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeFile?: (e: ChangeEvent<HTMLInputElement>) => void;
  setContent?: (e: string) => void;
  mode?: string;
  content?: string;
  fileDataURL?: string[];
}

export default function ContentModal(props: IContentModal) {
  const {
    handleChangeFile = () => {},
    handleSelect = () => {},
    setContent = () => {},
    mode = 'PUBLIC',
    content = '',
    fileDataURL = [],
  } = props;
  const {
    name = '',
    gender: genderCurrent = '',
    avatar = '',
  } = useAppSelector((state) => state.auth.currentUser);

  const getLayout = () => {
    if (fileDataURL.length <= 2) {
      return fileDataURL.map((x: any) => (
        <div key={x} className="mb-2 h-[150px] w-full">
          <img
            className="h-full w-full rounded object-cover"
            src={x}
            alt="post-img"
          />
        </div>
      ));
    }

    return (
      <div className="relative">
        <div className="h-[150px] w-full">
          <img
            className="h-full w-full rounded object-cover"
            src={fileDataURL[0] as string | undefined}
            alt="post-img"
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <img
              className="h-[150px] w-full rounded object-cover"
              src={fileDataURL[1] as string | undefined}
              alt="post-img"
            />
          </div>
          <div>
            <img
              className="h-[150px] w-full rounded object-cover"
              src={fileDataURL[2] as string | undefined}
              alt="post-img"
            />
          </div>
        </div>
        {fileDataURL.length > 3 && (
          <div className="absolute bottom-0 right-0 rounded bg-[rgba(0,0,0,0.5)] p-4 text-white">
            + {fileDataURL.length - 3}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <>
        <div className="flex items-center">
          <div className="mr-4 h-10 w-10 min-w-[40px]">
            <Avatar
              src={avatar}
              alt="avatar"
              gender={genderCurrent}
              className="h-full w-full"
            />
          </div>
          <div>
            <p className="text-lg font-medium sm:text-xl">{name}</p>
            <Select
              className="mt-2 w-52"
              handleChange={handleSelect}
              options={[
                {
                  id: '1',
                  value: 'PUBLIC',
                  label: 'Public 🌍',
                },
                { id: '2', value: 'PRIVATE', label: 'Private 🔒' },
                { id: '3', value: 'FRIEND', label: 'Friend 👭' },
              ]}
              name="mode"
              defaultValue={mode}
            />
          </div>
        </div>
        <div className="my-4">
          <textarea
            className="no-scrollbar h-fit w-full resize-none rounded bg-primary-color p-1  outline-none placeholder:text-base placeholder:text-primary"
            placeholder={`What is your mind? ${name} !`}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            maxLength={500}
          />
        </div>
        {fileDataURL?.length > 0 && getLayout()}
      </>
      <div className="my-4 grid grid-cols-3 gap-2">
        <UploadButton
          className="cursor-pointer"
          id="upload-file-post"
          multiple
          handleChange={handleChangeFile}
        >
          <ActionButton icon={<Comment />} text="Image" />
        </UploadButton>
        <ActionButton icon={<Comment />} text="Comment" />
        <ActionButton icon={<Comment />} text="Comment" />
      </div>
    </div>
  );
}
