import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { baseURL } from '@/api';
import CardPost from '@/components/CardPost';
import ActionButton from '@/components/common/ActionButton';
import Avatar from '@/components/common/Avatar';
import Divider from '@/components/common/Divider';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Tooltip from '@/components/common/Tooltip';
import UploadButton from '@/components/common/UploadButton';
import CreatePost from '@/components/CreatePost';
import Briefcase from '@/components/Icons/Briefcase';
import Chain from '@/components/Icons/Chain';
import Comment from '@/components/Icons/Comment';
import Heart from '@/components/Icons/Heart';
import Sad from '@/components/Icons/Sad';
import Smite from '@/components/Icons/Smite';
import Star from '@/components/Icons/Star';
import {
  createPost,
  editPost,
  getProfileListPosts,
  uploadFile,
} from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Block from './components/Block';
import InfoContent from './components/InfoContent';

interface ITimeline {
  setIsActive?: (value: string) => void;
  isFriend?: boolean;
}

export default function Timeline(props: ITimeline) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setIsActive = () => {}, isFriend = false } = props;

  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const listComments = useAppSelector((state) => state.comments.listComment);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const listPostsProps = useAppSelector((state) => state.profile.listPosts);

  const { name = '', gender: genderCurrent = '', avatar = '' } = currentUser;

  const {
    gender = '',
    socialLinks = [],
    hobbies = [],
    work = '',
    albums = [],
    followings = [],
    totalFollowing = 0,
    totalAlbums = 0,
    totalGroups = 0,
    totalFollowers = 0,
    groups = [],
    followers = [],
    id: profileId = '',
  } = profileUser;

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [postIdEdit, setPostIdEdit] = useState('');
  const [fileDataURL, setFileDataURL] = useState<string[]>([]);
  const [mode, setMode] = useState('PUBLIC');

  const onClose = () => {
    setOpenModal(false);
    setIsEdit(false);
    setContent('');
    setFileDataURL([]);
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
            mode,
          },
        })
      ).then((res: any) => {
        if (res.payload?.status === 200) {
          setOpenModal(false);
          setContent('');
          setIsEdit(false);
          const index = listPosts.findIndex(
            (x) => x.id === res.payload.data.post.id
          );
          const newArr = [...listPosts];
          newArr[index] = res.payload.data.post;
          setListPosts(newArr);
        }
      });
    } else {
      dispatch(
        createPost({
          type: 'POST',
          content,
          images: fileDataURL,
          mode,
        })
      ).then((res: any) => {
        if (res.payload?.status === 201) {
          setOpenModal(false);
          setContent('');
          setListPosts([...listPosts, res.payload.data.post]);
        }
      });
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('file', e.target.files[0] as string | Blob);
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

  const getLayout = () => {
    switch (fileDataURL.length > 2) {
      case false:
        return fileDataURL.map((x: any) => (
          <div key={x} className="h-[150px] w-full">
            <img
              className="h-full w-full rounded object-cover"
              src={x}
              alt="post-img"
            />
          </div>
        ));
      case true:
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
            <div className="absolute bottom-0 right-0 rounded bg-[rgba(0,0,0,0.5)] p-4 text-white">
              + {fileDataURL.length - 2}
            </div>
          </div>
        );
      default:
        return '';
    }
  };

  const getContent = () => {
    return (
      <div>
        <>
          <div className="flex items-center">
            <div className="mr-4 h-[40px] w-[40px]">
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
                handleChange={handleSelect}
                options={[
                  {
                    id: '1',
                    value: 'PUBLIC',
                    label: 'Public',
                  },
                  { id: '2', value: 'PRIVATE', label: 'Private' },
                  { id: '3', value: 'FRIEND', label: 'Friend' },
                ]}
                name="mode"
              />
            </div>
          </div>
          <div className="my-4">
            <textarea
              className="h-full w-full resize-none py-1 outline-none placeholder:text-base placeholder:text-gray-500"
              placeholder={`What is your mind? ${name} !`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          {fileDataURL?.length > 0 && getLayout()}
        </>
        <div className="my-4 grid grid-cols-3 gap-2">
          <UploadButton
            className="cursor-pointer"
            id="upload-file-post"
            handleChange={handleChangeFile}
          >
            <ActionButton icon={<Comment />} text="Image" />
          </UploadButton>
          <ActionButton icon={<Comment />} text="Comment" />
          <ActionButton icon={<Comment />} text="Comment" />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setListPosts(listPostsProps as []);
  }, [JSON.stringify(listPostsProps)]);

  useEffect(() => {
    if (profileId)
      dispatch(
        getProfileListPosts({
          type: 'POST',
          queryType: 'USER',
          limit: 10,
          user: profileId,
        })
      );
  }, [profileId]);

  return (
    <>
      <div className="flex w-full flex-col-reverse gap-2 sm:grid md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2">
          {isFriend && <CreatePost setOpenModal={setOpenModal} />}
          {listPosts.length <= 0 ? (
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
              />
            ))
          )}
        </div>

        <div className="row-start-1 h-full md:row-start-auto">
          <Block title="Info" seeAll={false} showTotal={false}>
            <InfoContent
              icon={
                gender === 'male' ? <Smite width={30} /> : <Sad width={30} />
              }
              content={gender === 'male' ? 'Male' : 'Female'}
            />
            {socialLinks && (
              <InfoContent
                isLink
                content={socialLinks && socialLinks[0]}
                icon={<Chain width={30} />}
              />
            )}
            <InfoContent icon={<Heart width={30} />} content="Single" />
            {hobbies && (
              <InfoContent
                icon={<Star width={30} />}
                content={hobbies && hobbies[0]}
              />
            )}
            {work && (
              <>
                <Divider />
                <InfoContent
                  icon={<Briefcase width={30} />}
                  content={work}
                />{' '}
              </>
            )}
          </Block>
          <Block
            total={totalAlbums}
            title="Photos"
            onClickSeeAll={() => setIsActive('3')}
          >
            <div className="grid grid-cols-3 gap-4">
              {(albums as []).slice(0, 9).map((x: Record<string, string>) => (
                <div key={x.id} className="col-span-1 h-[100px] w-full">
                  <img
                    alt="photo"
                    src={`${baseURL}/file/${x.filename}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </Block>

          <Block
            title="Following"
            total={totalFollowing}
            onClickSeeAll={() => setIsActive('2')}
          >
            <div className="grid grid-cols-3 gap-2">
              {(followings as []).map((x: any) => (
                <div
                  key={x.id}
                  onClick={() => router.push(`/user/${x.domain}`)}
                  className="hover:cursor-pointer"
                >
                  <div className="col-span-1 h-[100px] w-full">
                    <img
                      alt="photo-following"
                      src={x.avatar}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm">{x.name}</p>
                </div>
              ))}
            </div>
          </Block>
          <Block
            title="Followers"
            total={totalFollowers}
            onClickSeeAll={() => setIsActive('2')}
          >
            <div className="grid grid-cols-3 gap-4">
              {(followers as []).map((x: Record<string, string>) => (
                <div
                  key={x.id}
                  onClick={() => router.push(`/user/${x.domain}`)}
                  className="hover:cursor-pointer"
                >
                  <div className="col-span-1 h-[100px] w-full">
                    <img
                      alt="avatar-followers"
                      src={x.avatar}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">{x.name}</p>
                </div>
              ))}
            </div>
          </Block>
          <Block
            title="Groups"
            total={totalGroups}
            onClickSeeAll={() => setIsActive('4')}
          >
            <div className="grid grid-cols-3 gap-4">
              {(groups as []).map((x: Record<string, string>) => (
                <div key={x.id} className="hover:cursor-pointer">
                  <div className="col-span-1 h-[100px] w-full">
                    <img
                      alt="avatar-followers"
                      src={x.avatar}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <Tooltip description={x.name}>
                    <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
                      {x.name}
                    </p>
                  </Tooltip>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>

      <Modal
        title={isEdit ? 'Edit Post' : 'Create New Post'}
        textSubmitButton={isEdit ? 'Edit Post' : 'Create Post'}
        showModal={openModal}
        content={getContent()}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
}
