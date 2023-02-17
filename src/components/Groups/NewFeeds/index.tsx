/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import CardPost from '@/components/CardPost';
import Block from '@/components/common/Block';
import Modal from '@/components/common/Modal';
import PreviewPost from '@/components/common/PreviewPost';
import CreatePost from '@/components/CreatePost';
import ContentModal from '@/components/CreatePost/ContentModal';
import Earth from '@/components/Icons/Earth';
import Eye from '@/components/Icons/Eye';
import Group from '@/components/Icons/Group';
import Lock from '@/components/Icons/Lock';
import CardPostSkeleton from '@/components/Skeleton/CardPost';
import CreatePostSkeleton from '@/components/Skeleton/CreatePost';
import {
  createPost,
  editPost,
  getProfileListPosts,
  uploadFile,
} from '@/redux/actions';
import type { ICreatePost } from '@/redux/actions/Interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function NewFeeds() {
  const dispatch = useAppDispatch();
  const { query } = useRouter();

  const currentGroup = useAppSelector((state) => state.groups.currentGroup);
  const { description = '', mode: modeProps = '' } = currentGroup;

  const listComments = useAppSelector((state) => state.comments.listComment);
  const listPostsProps = useAppSelector((state) => state.posts.listPosts);
  const isUpdatePost = useAppSelector((state) => state.posts.isUpdatePost);
  const loadingListPost = useAppSelector((state) => state.posts.loadingPosts);
  const loadingGroupById = useAppSelector(
    (state) => state.groups.isLoadingDetail
  );

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [postIdEdit, setPostIdEdit] = useState('');
  const [fileDataURL, setFileDataURL] = useState<string[]>([]);
  const [mode, setMode] = useState('PUBLIC');

  const getUIByMode = () => {
    switch (modeProps) {
      case 'PUBLIC':
        return (
          <div className="flex items-start gap-2">
            <Earth />
            <div>
              <strong>Public</strong>
              <p>Everyone can see all posts of this group</p>
            </div>
          </div>
        );
      case 'PRIVATE':
        return (
          <div className="flex items-start gap-2">
            <Lock />
            <div>
              <strong>Private</strong>
              <p>Just member of group can see all posts of this group.</p>
            </div>
          </div>
        );
      case 'HIDDEN':
        return (
          <div className="flex items-start gap-2">
            <Eye />
            <div>
              <strong>Hidden</strong>
              <p>Only you can see all posts of this group. </p>
            </div>
          </div>
        );

      default:
        return '';
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('file', e.target.files[0] as string | Blob);
      formData.append('scope', 'HIDDEN');
      dispatch(uploadFile(formData)).then((res: any) => {
        const { payload: { status = 0, data = '' } = {} } = res;
        if (status === 201) {
          setFileDataURL([...fileDataURL, data.url]);
        }
      });
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const onClose = () => {
    setOpenModal(false);
    setIsEdit(false);
    setContent('');
    setFileDataURL([]);
    setMode('PUBLIC');
  };

  const onSubmit = () => {
    if (isEdit) {
      dispatch(
        editPost({
          postId: postIdEdit,
          payload: {
            type: 'POST',
            content,
            images: fileDataURL,
            tags: [],
            group: query.id as string,
            mode,
          },
        })
      ).then((res: any) => {
        if (res.payload?.status === 200) {
          setOpenModal(false);
          setContent('');
          setIsEdit(false);
          setFileDataURL([]);
          const index = listPosts.findIndex(
            (x) => x.id === res.payload.data.post.id
          );
          const newArr = [...listPosts];
          newArr[index] = res.payload.data.post;
          setListPosts(newArr);
        }
      });
    } else {
      const newPost = {
        type: 'POST',
        content,
        images: fileDataURL,
        mode,
        tags: [],
        group: query.id as string,
      };
      dispatch(createPost(newPost as ICreatePost)).then((res: any) => {
        if (res.payload?.status === 201) {
          setOpenModal(false);
          setContent('');
          setFileDataURL([]);
          setListPosts([res.payload.data.post, ...listPosts]);
        }
      });
    }
  };

  useEffect(() => {
    if (query.id)
      dispatch(
        getProfileListPosts({
          type: 'POST',
          queryType: 'GROUP',
          limit: 10,
          group: query.id as string,
        })
      );
  }, [query.id]);

  useEffect(() => {
    setListPosts(listPostsProps as []);
  }, [JSON.stringify(listPostsProps)]);

  return (
    <div className="flex w-full flex-col-reverse gap-2 sm:grid md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        {loadingGroupById ? (
          <CreatePostSkeleton />
        ) : (
          <CreatePost setOpenModal={setOpenModal} />
        )}
        {loadingListPost || loadingGroupById ? (
          <CardPostSkeleton />
        ) : listPosts.length <= 0 ? (
          <p className="text-center">Don&apos;t have any post! </p>
        ) : (
          (listPosts as Record<string, string>[]).map((x) => (
            <CardPost
              setIsEdit={setIsEdit}
              post={x}
              key={x.id}
              listComments={listComments}
              setOpenModal={setOpenModal}
              setContent={setContent}
              setPostIdEdit={setPostIdEdit}
              setListPosts={setListPosts}
              setFileDataURL={setFileDataURL}
              listPosts={listPosts}
              setMode={setMode}
              // isPersonPage={isCurrentUser}
            />
          ))
        )}
      </div>
      <div className="row-start-1 h-full md:row-start-auto">
        <Block title="Info" seeAll={false} showTotal={false}>
          <div className="mb-4 flex items-center break-all text-sm">
            <Group />
            <span className="pl-2">1 member</span>
          </div>
          <div className="flex items-center break-all text-sm">
            {getUIByMode()}
          </div>
        </Block>
        {description && (
          <Block title="About" seeAll={false} showTotal={false}>
            <p className="text-base">{description}</p>
          </Block>
        )}
        <Block
          title="New shared media files"
          seeAll={false}
          showTotal={false}
          total={0}
        >
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-full w-full overflow-hidden rounded"
              >
                <PreviewPost
                  data={
                    'https://ss-images.saostar.vn/2017/06/04/1325225/tuhat-e1496585469861.jpg'
                  }
                  classNameImg="transition-all hover:scale-125"
                />
              </div>
            ))}
          </div>
        </Block>
      </div>
      <Modal
        title={isEdit ? 'Edit Post' : 'Create New Post'}
        textSubmitButton={isEdit ? 'Edit Post' : 'Create Post'}
        showModal={openModal}
        content={
          <ContentModal
            handleChangeFile={handleChangeFile}
            mode={mode}
            handleSelect={handleSelect}
            setContent={setContent}
            fileDataURL={fileDataURL}
            content={content}
          />
        }
        onClose={onClose}
        onSubmit={onSubmit}
        loading={isUpdatePost}
      />
    </div>
  );
}
