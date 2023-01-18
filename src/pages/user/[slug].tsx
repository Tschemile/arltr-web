import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import UploadButton from '@/components/common/UploadButton';
import BulletList from '@/components/Icons/BulletList';
import Camera from '@/components/Icons/Camera';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Heart from '@/components/Icons/Heart';
import Message from '@/components/Icons/Message';
import PlusIcon from '@/components/Icons/PlusIcon';
import Friends from '@/components/Profile/Friends';
import Timeline from '@/components/Profile/Timeline';
import { Meta } from '@/layouts/Meta';
import {
  editProfile,
  getProfileUser,
  makeRelation,
  uploadFile,
} from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TimelineLayout } from '@/templates/TimelineLayout';

const User = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const { id: currentUserId = '' } = useAppSelector(
    (state) => state.auth.currentUser
  );

  const {
    name = '',
    gender = '',
    avatar: avatarProps = '',
    cover: coverImgProps = '',
    about: aboutProps = '',
    id = '',
  } = profileUser;

  const isCurrentUser = currentUserId === id;

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
      content: <Timeline setIsActive={setIsActive} />,
    },
    {
      key: '2',
      title: 'Friend',
      content: (
        <Friends isCurrentUser={isCurrentUser} profileUser={profileUser} />
      ),
    },
    {
      key: '3',
      title: 'Photos',
      content: 'hihi',
    },
    {
      key: '4',
      title: 'Groups',
      content: 'hihi',
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
          setCoverImg(data);
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
          setAvatarImg(data);
        }
      });
    }
  };

  useEffect(() => {
    if (query.slug) dispatch(getProfileUser(query.slug));
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
                  <Camera width={24} />{' '}
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
                  className="absolute top-[55%] left-[53%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white bg-primary-color p-1"
                >
                  <Camera />
                </UploadButton>
              )}
            </div>
            <div className="">
              <h1 className="text-3xl">{name}</h1>
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

          <div className="flex flex-col-reverse items-center justify-between py-2 px-4 text-base lg:flex-row">
            <div className="mt-2 flex items-center lg:mt-0">
              <Tabs
                options={options}
                defaultKey={active}
                handleChange={(key) => setIsActive(key)}
                border={false}
              />
              <span className="px-4 py-2">More</span>
            </div>
            <div className="flex">
              {isCurrentUser ? (
                <div className="flex items-center text-sm">
                  <Button>
                    <PlusIcon /> Add your story
                  </Button>
                  <div className="ml-1">
                    <Button background="secondary">
                      <BulletList />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-sm">
                  <Button className="bg-gray-600">
                    <Message />
                    Chat
                  </Button>
                  <Button
                    className="ml-1"
                    onSubmit={() =>
                      dispatch(makeRelation({ user: id, type: 'FOLLOW' }))
                    }
                  >
                    <Heart />
                    Follow
                  </Button>
                  <Button
                    className="ml-1 bg-gray-600"
                    onSubmit={() =>
                      dispatch(makeRelation({ user: id, type: 'FRIEND' }))
                    }
                  >
                    <PlusIcon />
                    Add friend
                  </Button>
                </div>
              )}
              <div className="group flex flex-col">
                <div className="ml-1">
                  <Button background="secondary">
                    <EllipsisHorizon />
                  </Button>
                </div>
                <div>
                  <ul className="absolute z-[2] hidden w-52 bg-white p-2 group-hover:block">
                    <li>
                      <a href="#"> View as guast </a>
                    </li>
                    <li>
                      <a href="#"> Block this person </a>
                    </li>
                    <li>
                      <a href="#"> Report abuse</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabsContent
        className="lg:mx-[10%] xl:mx-[15%]"
        options={options}
        active={active}
      />
    </TimelineLayout>
  );
};

export default User;
