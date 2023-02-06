import router, { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Avatar from '@/components/common/Avatar';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import UploadButton from '@/components/common/UploadButton';
import Camera from '@/components/Icons/Camera';
import Friends from '@/components/Profile/Friends';
import Groups from '@/components/Profile/Groups';
import OptionAction from '@/components/Profile/OptionAction';
import Photos from '@/components/Profile/Photos';
import Timeline from '@/components/Profile/Timeline';
import ProfileHeader from '@/components/Skeleton/ProfileHeader';
import { Meta } from '@/layouts/Meta';
import {
  editProfile,
  getListRelation,
  getProfileUser,
  uploadFile,
} from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TimelineLayout } from '@/templates/TimelineLayout';

const User = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const loadingUser = useAppSelector((state) => state.profile.loading);
  const {
    currentUser: {
      id: currentUserId = '',
      followings: followingUser = [],
      friends: friendUser = [],
    },
    isLoading: { loadingCurrentUser = false },
  } = useAppSelector((state) => state.auth);
  const {
    listRelation,
    isLoading: { loadingListRelation = false },
  } = useAppSelector((state) => state.relation);

  const {
    name = '',
    gender = '',
    avatar: avatarProps = '',
    cover: coverImgProps = '',
    about: aboutProps = '',
    id = '',
    domain = '',
  } = profileUser;

  const isCurrentUser = currentUserId === id;
  const isFollowing = followingUser?.find((x: any) => x.domain === domain);
  const isFriend = friendUser?.find((x: any) => x.domain === domain);
  const listRequesting = listRelation?.filter(
    (x: any) => x.requester.id === currentUserId
  );
  const currentIsRequest =
    listRequesting?.find((x: any) => x.user.domain === domain) || {};

  const [active, setIsActive] = useState('1');
  const [isEditIntro, setIsEditIntro] = useState(false);
  const [introValue, setIntroValue] = useState('');
  const [about, setAbout] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [avatarImg, setAvatarImg] = useState('');

  const options = [
    {
      key: '1',
      title: 'Timeline',
      content: (
        <Timeline
          setIsActive={setIsActive}
          isFriend={isFriend || isCurrentUser}
        />
      ),
    },
    {
      key: '2',
      title: 'Friends',
      content: (
        <Friends isCurrentUser={isCurrentUser} profileUser={profileUser} />
      ),
    },
    {
      key: '3',
      title: 'Photos',
      content: <Photos />,
    },
    {
      key: '4',
      title: 'Groups',
      content: <Groups />,
    },
    {
      key: '5',
      title: 'Videos',
      content: 'hihi',
    },
  ];

  const handleEditIntro = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editProfile({ about: introValue })).then((res: any) => {
      if (res.payload.status === 200) {
        setAbout(res.payload.data.profile.about);
        setIsEditIntro(false);
      }
    });
  };

  const handleUploadCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', e.target.files[0] as string | Blob);
      formData.append('type', 'COVER');
      dispatch(uploadFile(formData)).then((res: any) => {
        const { payload: { status = 0, data = '' } = {} } = res;
        if (status === 201) {
          toast.success('Upload success');
          setCoverImg(data.url);
        }
      });
    }
  };

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', e.target.files[0] as string | Blob);
      formData.append('type', 'AVATAR');
      dispatch(uploadFile(formData)).then((res: any) => {
        const { payload: { status = 0, data = '' } = {} } = res;
        if (status === 201) {
          toast.success('Upload success');
          setAvatarImg(data.url);
        }
      });
    }
  };

  useEffect(() => {
    if (query.slug) {
      dispatch(getProfileUser(query.slug))
        .unwrap()
        .catch((err) => {
          if (err.code === 'ERR_BAD_REQUEST') router.back();
        });
      dispatch(getListRelation({ type: 'FRIEND', status: 'REQUESTING' }));
    }
  }, [query.slug]);

  useEffect(() => {
    if (coverImgProps) setCoverImg(coverImgProps);
  }, [coverImgProps]);

  useEffect(() => {
    if (avatarProps) setAvatarImg(avatarProps);
  }, [avatarProps]);

  useEffect(() => {
    if (aboutProps) setAbout(aboutProps);
  }, [aboutProps]);

  return (
    <TimelineLayout
      meta={
        <Meta title={`${name} | Bé ơi ❤️`} description={`${name} | Bé ơi ❤️`} />
      }
    >
      <div className="w-full bg-gradient-to-t from-white to-[#4d80a4]">
        {(loadingListRelation && !isCurrentUser) ||
        loadingCurrentUser ||
        loadingUser ? (
          <ProfileHeader />
        ) : (
          <div className="bg-white lg:mx-[10%] xl:mx-[15%]">
            <div className="relative max-h-full min-h-[285px]">
              <img
                src={
                  coverImg ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiO6M2jjKviDwF34WYZNnre5zTIVjw5if7AwVY47W6aaC85ilP1Npnd2-fkjpziXouC-M&usqp=CAU'
                }
                alt="cover-img"
                className="absolute top-1/2 right-0 bottom-0 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              />
              {isCurrentUser && (
                <div className="absolute bottom-2 right-3 z-[3]">
                  <UploadButton
                    handleChange={handleUploadCover}
                    id="upload-cover"
                    className="flex cursor-pointer items-center rounded-md bg-primary-color px-2 py-1"
                  >
                    <Camera width={24} />
                    <span className="p-1 text-sm">Edit</span>
                  </UploadButton>
                </div>
              )}
            </div>

            <div className="relative z-[2] -mt-24 mb-4 text-center">
              <div className="mx-auto mb-2 h-[120px] w-[120px]">
                <Avatar
                  src={avatarImg}
                  alt="avatar"
                  gender={gender}
                  width={125}
                  height={125}
                  className="h-full w-full border-[3px] border-solid border-white"
                />
                {isCurrentUser && (
                  <UploadButton
                    id="upload-avatar"
                    handleChange={handleUploadAvatar}
                    className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white bg-primary-color p-1 sm:left-[53%]"
                  >
                    <Camera />
                  </UploadButton>
                )}
              </div>
              <div className="">
                <h1 className="text-xl font-medium sm:text-2xl">{name}</h1>
                <div className="text-sm">
                  {isEditIntro ? (
                    <form
                      onSubmit={(e) => handleEditIntro(e)}
                      className="inline-block w-1/3 text-sm"
                    >
                      <input
                        placeholder="Let introduce yourself now..."
                        className="w-full rounded border border-primary-border py-1 px-4 text-base outline-none placeholder:text-base"
                        defaultValue={about}
                        onChange={(e) => setIntroValue(e.target.value)}
                      />
                    </form>
                  ) : (
                    about
                  )}
                  {isCurrentUser && (
                    <button
                      className="pl-4 text-blue-500"
                      onClick={() => setIsEditIntro(!isEditIntro)}
                    >
                      {isEditIntro ? 'Cancel' : 'Edit'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse items-center justify-between p-2 text-base sm:px-4 lg:flex-row">
              <div className="mt-2 text-xs sm:text-base lg:mt-0">
                <Tabs
                  options={options}
                  defaultKey={active}
                  handleChange={(key) => setIsActive(key)}
                  border={false}
                />
                {/* <span className="px-4 py-2">More</span> */}
              </div>
              <OptionAction
                isFollowing={isFollowing}
                isCurrentUser={isCurrentUser}
                id={id}
                isFriend={isFriend}
                isRequest={Object.keys(currentIsRequest).length !== 0}
              />
            </div>
          </div>
        )}
      </div>
      <TabsContent
        className="py-4 lg:mx-[10%] xl:mx-[15%]"
        options={options}
        active={active}
      />
    </TimelineLayout>
  );
};

export default User;
