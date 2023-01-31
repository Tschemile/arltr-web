import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { deleteComment, editComment } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Avatar from '../../../common/Avatar';
import Dropdown from '../../../common/Dropdown';
import EllipsisHorizon from '../../../Icons/EllipsisHorizon';
import CommentForm from '../CommentForm';

interface IComment {
  item: Record<string, string>;
  setIsDeletedCmtID?: (value: string) => void;
}

export default function CommentBox(props: IComment) {
  const dispatch = useAppDispatch();
  const refs = useRef<null>(null);
  const { item = {}, setIsDeletedCmtID = () => {} } = props;
  const {
    image = '',
    user = {},
    content: contentProps = '',
    id: commentId = '',
  } = item;
  const { name = '', id: authorId = '' } = user as Record<string, string>;
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contentCmt, setContentCmt] = useState('');

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentId)).then((res: any) => {
      if (res.payload.status === 200) {
        setIsDeletedCmtID(commentId);
      }
    });
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setContentCmt(e.target.value);
  };

  const handleEditCmt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editComment({ commentId, payload: { content: contentCmt } })).then(
      (res: any) => {
        if (res.payload.status === 200) {
          setContentCmt(res.payload.data.comment.content);
          setIsEdit(false);
          setOpen(false);
        }
      }
    );
  };

  useEffect(() => {
    if (contentProps) setContentCmt(contentProps);
  }, [contentProps]);

  useEffect(() => {
    if (isEdit && refs.current) (refs.current as any).focus();
  }, [isEdit]);

  if (isEdit)
    return (
      <>
        <CommentForm
          contentCmt={contentCmt}
          refs={refs}
          onChange={(e) => handleChangeComment(e)}
          onSubmit={(e) => handleEditCmt(e)}
        />
        <p
          className="cursor-pointer pr-4 text-right text-xs text-blue-300"
          onClick={() => {
            setIsEdit(false);
            setOpen(false);
            setContentCmt(contentProps);
          }}
        >
          Cancel
        </p>
      </>
    );

  return (
    <div className="group flex items-center py-2">
      <div className="mr-4 h-[40px] w-[40px]">
        <Avatar
          src={image}
          alt="avatar"
          className="m-auto h-full w-full rounded-full"
        />
      </div>
      <div className="relative rounded-lg bg-primary-color p-2 after:absolute after:top-3 after:-left-5 after:border-[10px] after:border-transparent after:border-r-primary-color">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="whitespace-pre-line text-sm">{contentCmt}</p>
      </div>
      {currentUser.id === authorId && (
        <div className="">
          <Dropdown
            open={open}
            content={[
              {
                id: '1',
                title: 'Edit',
                handleCLick: () => setIsEdit(true),
              },
              {
                id: '2',
                title: 'Delete',
                handleCLick: () => handleDeleteComment(),
              },
            ]}
          >
            <button onClick={() => setOpen(!open)}>
              <EllipsisHorizon />
            </button>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
