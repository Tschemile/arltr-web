import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Like from '@/components/Icons/Like';
import {
  addComment,
  deletePost,
  getCommentsOfPost,
  makeReaction,
} from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { timeSince } from '@/utils/func';

import ActionButton from '../common/ActionButton';
import Avatar from '../common/Avatar';
import Divider from '../common/Divider';
import Dropdown from '../common/Dropdown';
import IconButton from '../common/IconButton';
import Tooltip from '../common/Tooltip';
import Comment from '../Icons/Comment';
import CommentBox from './components/CommentBox';
import CommentForm from './components/CommentForm';

interface ICardPost {
  setIsEdit?: (value: boolean) => void;
  post?: Record<string, string>;
  listComments?: any[];
  setOpenModal?: (value: boolean) => void;
  setContent?: (value: string) => void;
  setPostIdEdit?: (value: string) => void;
  setListPosts?: (value: Record<string, string>[]) => void;
  listPosts?: Record<string, string>[];
}

export default function CardPost(props: ICardPost) {
  const dispatch = useAppDispatch();
  const refs = useRef<null>(null);
  const {
    post = {},
    listComments = [],
    setIsEdit = () => {},
    setOpenModal = () => {},
    setContent = () => {},
    setPostIdEdit = () => {},
    setListPosts = () => {},
    listPosts = [],
  } = props;

  const {
    author = {},
    images = [],
    totalComments: totalCommentsProps = 0,
    totalReacts: totalReactsProps = 0,
    id = '',
    createdAt: datePostProps = new Date(),
    content = '',
    react = {},
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
  const [isLiked, setIsLiked] = useState(false);
  const [totalReacts, setTotalReacts] = useState(0);
  const [isDeletedCmtID, setIsDeletedCmtID] = useState('');

  const datePosts = new Date(datePostProps);
  const dateFormated = `${datePosts.getDate()}/${
    datePosts.getMonth() < 9
      ? `0${datePosts.getMonth() + 1}`
      : datePosts.getMonth()
  }/${datePosts.getFullYear()} at ${datePosts.getHours()}:${datePosts.getMinutes()}`;

  const timeCreated = Math.floor(
    Date.parse(new Date().toDateString()) - Date.parse(datePostProps as string)
  );

  const timeOfPosts = timeSince(timeCreated, dateFormated);

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

  const handleEditPost = () => {
    setOpen(false);
    setOpenModal(true);
    setIsEdit(true);
    setContent(content);
    setPostIdEdit(id);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(id)).then((res: any) => {
      if (res.payload.status === 200) {
        setOpen(false);
        setListPosts(listPosts.filter((x) => x.id !== id));
        toast.success('Delete post success');
      }
    });
  };

  const handleLikePost = () => {
    dispatch(makeReaction({ post: id, type: 'LIKE' })).then((res: any) => {
      if (res.payload.status === 200) {
        setIsLiked((prevState) => !prevState);
        if (!isLiked) {
          setTotalReacts(totalReacts + 1);
        } else {
          setTotalReacts(totalReacts - 1);
        }
      }
    });
  };

  useEffect(() => {
    if (totalReactsProps) setTotalReacts(Number(totalReactsProps));
  }, [totalReactsProps]);

  useEffect(() => {
    if (react)
      setIsLiked(
        currentUser.id === (react as Record<string, string | any>).user?.id
      );
  }, []);

  useEffect(() => {
    if (isDeletedCmtID) {
      setComments(comments.filter((x) => x.id !== isDeletedCmtID));
      setTotalComments(totalComments - 1);
      dispatch(getCommentsOfPost({ post: id, limit }));
    }
  }, [isDeletedCmtID]);

  if (listPosts.length <= 0)
    return <p className="text-center">Don&apos;t have any post! </p>;

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
            <Tooltip description={dateFormated}>
              <p className="text-sm">{timeOfPosts}</p>
            </Tooltip>
          </div>
        </div>
        <Dropdown
          open={open}
          content={[
            {
              id: '1',
              title: 'Edit Post',
              handleCLick: () => handleEditPost(),
            },
            {
              id: '2',
              title: 'Delete Post',
              handleCLick: () => handleDeletePost(),
            },
          ]}
        >
          <button onClick={() => setOpen(!open)}>
            <EllipsisHorizon />
          </button>
        </Dropdown>
      </div>
      <div className="whitespace-pre-line py-2 ">{content}</div>
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
          className={`justify-center ${isLiked ? 'text-red-700' : ''}`}
          onClick={() => handleLikePost()}
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
        (comments || [])
          .slice(0, limit)
          .map((x: any) => (
            <CommentBox
              setIsDeletedCmtID={setIsDeletedCmtID}
              key={x.id}
              item={x}
            />
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

      <CommentForm
        onChange={(e) => handleChangeComment(e)}
        onSubmit={(e) => handleAddComment(e)}
        contentCmt={contentCmt}
        refs={refs}
      />
    </div>
  );
}
