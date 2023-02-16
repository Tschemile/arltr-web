/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import CardPost from '@/components/CardPost';
import Block from '@/components/common/Block';
import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';
import Modal from '@/components/common/Modal';
import Tooltip from '@/components/common/Tooltip';
import CreatePost from '@/components/CreatePost';
import ContentModal from '@/components/CreatePost/ContentModal';
import Briefcase from '@/components/Icons/Briefcase';
import Chain from '@/components/Icons/Chain';
import Heart from '@/components/Icons/Heart';
import Sad from '@/components/Icons/Sad';
import Smite from '@/components/Icons/Smite';
import Star from '@/components/Icons/Star';
import CardPostSkeleton from '@/components/Skeleton/CardPost';
import CreatePostSkeleton from '@/components/Skeleton/CreatePost';
import InfoBlock from '@/components/Skeleton/ProfileBlock/Info';
import PhotosBlock from '@/components/Skeleton/ProfileBlock/Photos';
import RelationShip from '@/components/Skeleton/ProfileBlock/Relationship';
import {
  createPost,
  editPost,
  getProfileListPosts,
  uploadFile,
} from '@/redux/actions';
import type { ICreatePost } from '@/redux/actions/Interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getFirstLetter } from '@/utils/func';

import EditInfoModal from './components/EditInfoModal';
import InfoContent from './components/InfoContent';

interface ITimeline {
  setIsActive?: (value: string) => void;
  isFriend?: boolean;
  isCurrentUser?: boolean;
}

export default function Timeline(props: ITimeline) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    setIsActive = () => {},
    isFriend = false,
    isCurrentUser = true,
  } = props;

  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const listComments = useAppSelector((state) => state.comments.listComment);
  const listPostsProps = useAppSelector((state) => state.posts.listPosts);
  const loadingListPost = useAppSelector((state) => state.posts.loadingPosts);
  const loadingProfile = useAppSelector((state) => state.profile.loading);
  const isUpdatePost = useAppSelector((state) => state.posts.isUpdatePost);
  const loadingCurrentUser = useAppSelector(
    (state) => state.auth.isLoading.loadingCurrentUser
  );

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
    status = '',
  } = profileUser;

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [postIdEdit, setPostIdEdit] = useState('');
  const [fileDataURL, setFileDataURL] = useState<string[]>([]);
  const [mode, setMode] = useState('PUBLIC');
  const [openModalEditInfo, setOpenModalEditInfo] = useState(false);

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
      const newPost = { type: 'POST', content, images: fileDataURL, mode };
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
          {loadingProfile || loadingCurrentUser ? (
            <CreatePostSkeleton />
          ) : (
            isFriend && <CreatePost setOpenModal={setOpenModal} />
          )}
          {loadingListPost || loadingProfile || loadingCurrentUser ? (
            <CardPostSkeleton />
          ) : listPosts.length <= 0 && !loadingListPost && !loadingProfile ? (
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
                isPersonPage={isCurrentUser}
              />
            ))
          )}
        </div>

        <div className="row-start-1 h-full md:row-start-auto">
          {loadingProfile || loadingCurrentUser ? (
            <InfoBlock />
          ) : (
            <Block title="Info" seeAll={false} showTotal={false}>
              <InfoContent
                icon={
                  gender === 'male' ? <Smite width={30} /> : <Sad width={30} />
                }
                content={gender === 'male' ? 'Male' : 'Female'}
              />
              {socialLinks &&
                socialLinks.map((x: string) => (
                  <InfoContent
                    key={x}
                    isLink
                    content={x}
                    icon={<Chain width={30} />}
                  />
                ))}
              {status !== 'NONE' && (
                <InfoContent icon={<Heart width={30} />} content={status} />
              )}
              {hobbies && (
                <InfoContent
                  icon={<Star width={30} />}
                  content={hobbies && hobbies[0]}
                />
              )}
              {work && (
                <>
                  <Divider />
                  <InfoContent icon={<Briefcase width={30} />} content={work} />
                </>
              )}
              {isCurrentUser && (
                <Button
                  className="!block w-full bg-pink-400 text-center text-base"
                  onSubmit={() => setOpenModalEditInfo(true)}
                >
                  Edit detail
                </Button>
              )}
            </Block>
          )}

          {loadingProfile || loadingCurrentUser ? (
            <PhotosBlock />
          ) : (
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
                      src={x.url}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </Block>
          )}

          {loadingProfile || loadingCurrentUser ? (
            <RelationShip />
          ) : (
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
          )}

          {loadingProfile || loadingCurrentUser ? (
            <RelationShip />
          ) : (
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
          )}

          {loadingProfile || loadingCurrentUser ? (
            <RelationShip />
          ) : (
            <Block
              title="Groups"
              total={totalGroups}
              onClickSeeAll={() => setIsActive('4')}
            >
              <div className="grid grid-cols-3 gap-4">
                {(groups as []).map((x: Record<string, string>) => (
                  <div
                    key={x.id}
                    className="hover:cursor-pointer"
                    onClick={() => router.push(`/groups/${x.id}`)}
                  >
                    <div className="col-span-1 h-[100px] w-full">
                      {x.avatar ? (
                        <img
                          alt="avatar-followers"
                          src={x.avatar}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-pink-400 text-white">
                          {getFirstLetter(x.name as string)}
                        </div>
                      )}
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
          )}
        </div>
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

      <EditInfoModal
        open={openModalEditInfo}
        onClose={() => setOpenModalEditInfo(false)}
      />
    </>
  );
}
