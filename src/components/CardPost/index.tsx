import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Like from '@/components/Icons/Like';
import { addComment, getCommentsOfPost } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import ActionButton from '../common/ActionButton';
import Avatar from '../common/Avatar';
import Divider from '../common/Divider';
import Dropdown from '../common/Dropdown';
import IconButton from '../common/IconButton';
import Chain from '../Icons/Chain';
import Comment from '../Icons/Comment';
import Smite from '../Icons/Smite';

interface CardPostProps {
  children: ReactNode;
  img?: string;
  post?: Record<string, string>;
  listComments?: any[];
}

export default function CardPost(props: CardPostProps) {
  const dispatch = useAppDispatch();
  const refs = useRef<null>(null);
  const { post = {}, listComments = [] } = props;
  const {
    author = {},
    images = [],
    totalComments: totalCommentsProps = 0,
    totalReacts = 0,
    id = '',
    createdAt: datePostProps = new Date(),
  } = post;
  const {
    name: authorName = '',
    gender: authorGender = '',
    avatar: authorAvatar = '',
  } = author as Record<string, string>;

  const [isClickedCmt, setIsClickedCmt] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [contentCmt, setContentCmt] = useState('');
  const [totalComments, setTotalComments] = useState(
    Number(totalCommentsProps)
  );
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(2);
  const datePosts = new Date(datePostProps);
  const timeCreated = Math.floor(
    (Date.parse(new Date()) - Date.parse(datePostProps)) / 3600000
  );
  const timeOfPosts =
    timeCreated < 24
      ? `${timeCreated} hours`
      : `${datePosts.getDate()}/${
          datePosts.getMonth() + 1
        }/${datePosts.getFullYear()}`;

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const getAllCommentsOfPost = (postId: string) => {
    if (totalComments > 0 && !isClickedCmt) {
      dispatch(getCommentsOfPost({ post: postId, limit }));
    }
    setIsClickedCmt(true);
    if (refs.current) (refs.current as any).focus();
  };

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addComment({ post: id, content: contentCmt, image: currentUser?.avatar })
    ).then((res) => {
      if (res.payload.comment) {
        setContentCmt('');
        dispatch(getCommentsOfPost({ post: id, limit }));
        setTotalComments(totalComments + 1);
      }
    });
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setContentCmt(e.target.value);
  };

  useEffect(() => {
    if (listComments && listComments.length) {
      const find = listComments.find((x) => {
        return x.postId === id;
      });
      if (find) setComments(find.data);
    }
  }, [JSON.stringify(listComments)]);

  useEffect(() => {
    return () => {
      setIsClickedCmt(false);
      setLimit(2);
    };
  }, []);

  return (
    <div className={`mb-4 rounded-lg bg-white px-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-2">
          <div className="mr-4 h-[45px] w-[45px]">
            <Avatar
              src={authorAvatar}
              alt="avatar"
              width={50}
              className="m-auto h-full w-full rounded-full"
              gender={authorGender}
            />
          </div>
          <div className="">
            <h3 className="text-lg font-medium">{authorName}</h3>
            <p className="text-sm">{timeOfPosts}</p>
          </div>
        </div>
        <Dropdown
          open={open}
          content={[
            { id: '1', title: 'Edit Post' },
            { id: '2', title: 'Delete Post' },
          ]}
        >
          <button onClick={() => setOpen(!open)}>
            <EllipsisHorizon />
          </button>
        </Dropdown>
      </div>
      <div className="py-2">{props.children}</div>
      {!!images &&
        (images as string[])?.map((img) => (
          <div
            key={img}
            className="relative max-h-[185px] min-h-[300px] overflow-hidden rounded"
          >
            <img
              src={img}
              alt="image"
              className="absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        ))}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center">
          <IconButton className="ml-0 mr-1 p-0">
            <Like width={22} color="blue" />
          </IconButton>
          <span className="text-sm">{totalReacts}</span>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => getAllCommentsOfPost(id)}
        >
          <span className="pr-1">{totalComments}</span>
          <span>Comment</span>
        </div>
      </div>
      <Divider />
      <div className="-my-3 flex">
        <ActionButton
          className="justify-center"
          // onClick={() => getAllCommentsOfPost(id)}
          icon={<Like />}
          text="Like"
        />
        <ActionButton
          className="justify-center"
          onClick={() => getAllCommentsOfPost(id)}
          icon={<Comment />}
          text="Comment"
        />
      </div>
      <Divider />

      {isClickedCmt &&
        (comments || []).slice(0, limit).map((x: any) => (
          <div key={x.id} className="group flex items-center py-2">
            <div className="mr-4 h-[40px] w-[40px]">
              <Avatar
                src={x.image}
                alt="avatar"
                className="m-auto h-full w-full rounded-full"
              />
            </div>
            <div className="relative rounded-lg bg-primary-color p-2 after:absolute after:top-3 after:-left-5 after:border-[10px] after:border-transparent after:border-r-primary-color">
              <h3 className="text-lg font-medium">{x.user.name}</h3>
              <p className="text-sm">{x.content}</p>
            </div>
            <div className="hidden group-hover:block ">
              <EllipsisHorizon />
            </div>
          </div>
        ))}
      {totalComments > 2 &&
        isClickedCmt &&
        totalComments !== (comments || []).length &&
        totalComments - limit > 0 && (
          <div
            className="cursor-pointer text-sm underline opacity-50 hover:opacity-100"
            onClick={() => {
              setLimit(limit + 10);
              dispatch(getCommentsOfPost({ post: id, limit: limit + 10 }));
            }}
          >
            View more {totalComments - limit} comments
          </div>
        )}

      <div className="flex items-center py-3">
        <div className="mr-4 h-[40px] w-[40px]">
          <Avatar
            src={currentUser.avatar}
            alt="avatar"
            className="m-auto h-full w-full rounded-full"
          />
        </div>
        <form
          onSubmit={(e) => {
            handleAddComment(e);
          }}
          className="flex w-full items-center justify-between rounded-full bg-primary-color px-4"
        >
          <input
            placeholder="Write comment here..."
            value={contentCmt}
            ref={refs}
            onChange={(e) => handleChangeComment(e)}
            className="w-full bg-primary-color p-2 text-sm outline-none placeholder:text-sm placeholder:text-gray-500"
          />
          <ul className="flex items-center">
            <li className="cursor-pointer">
              <Chain />
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
    </div>
  );
}
