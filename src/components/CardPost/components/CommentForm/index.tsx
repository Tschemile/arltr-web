import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { ChangeEvent, FormEvent } from "react";
import React, { useState } from "react";

import Avatar from "@/components/common/Avatar";
import UploadButton from "@/components/common/UploadButton";
import Chain from "@/components/Icons/Chain";
import EllipsisHorizon from "@/components/Icons/EllipsisHorizon";
import Smite from "@/components/Icons/Smite";
import useClickOutside from "@/hooks/useClickOutside";
import { useAppSelector } from "@/redux/hooks";

interface ICommentForm {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setContentCmt: (value: string) => void;
  contentCmt?: string;
  refs?: any;
  handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  isFirstPost?: boolean;
}

export default function CommentForm(props: ICommentForm) {
  const {
    onSubmit = () => {},
    setContentCmt = () => {},
    contentCmt = "",
    refs = {},
    handleChangeFile = () => {},
    id = "",
    isFirstPost = false,
  } = props;

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ref = useClickOutside(() => {
    setShowEmojiPicker(false);
  });

  const onClick = (emojiData: any) => {
    setContentCmt(contentCmt + emojiData.native);
  };

  return (
    <div className="flex items-center py-3">
      <div className="mr-4 h-10 w-10 min-w-[40px]">
        <Avatar
          src={currentUser.avatar}
          alt="avatar"
          className="m-auto h-full w-full rounded-full"
        />
      </div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit(e);
        }}
        className="flex w-full items-center justify-between rounded-full bg-primary-color px-4"
      >
        <input
          placeholder="Write comment here..."
          value={contentCmt}
          ref={refs}
          onChange={(e) => setContentCmt(e.target.value)}
          onClick={() => setShowEmojiPicker(false)}
          className="w-full bg-primary-color p-2 text-sm outline-none placeholder:text-sm placeholder:text-gray-500"
        />
        <ul className=" flex items-center">
          <li className="cursor-pointer">
            <UploadButton
              className="cursor-pointer"
              id={id}
              handleChange={handleChangeFile}
            >
              <Chain />
            </UploadButton>
          </li>
          <li className="relative cursor-pointer" ref={ref}>
            <div onMouseDown={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smite />
            </div>
            {showEmojiPicker && (
              <div className={`absolute ${isFirstPost ? 'top-full' : 'bottom-full'}  z-10 -translate-x-1/2 transition-all`}>
                <Picker
                  data={data}
                  onEmojiSelect={onClick}
                  previewPosition="none"
                />
              </div>
            )}
          </li>
          <li className="cursor-pointer">
            <EllipsisHorizon />
          </li>
        </ul>
      </form>
    </div>
  );
}
