import { FastAverageColor } from 'fast-average-color';
import router, { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';
import Dropdown from '@/components/common/Dropdown';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import Tooltip from '@/components/common/Tooltip';
import UploadButton from '@/components/common/UploadButton';
import Members from '@/components/Groups/Members';
import NewFeeds from '@/components/Groups/NewFeeds';
import BulletList from '@/components/Icons/BulletList';
import Camera from '@/components/Icons/Camera';
import PencilSquare from '@/components/Icons/PenciSquare';
import PlusIcon from '@/components/Icons/PlusIcon';
import Trash from '@/components/Icons/Trash';
import { MEMBERS } from '@/constants/enum';
import { Meta } from '@/layouts/Meta';
import {
  deleteGroup,
  editGroup,
  getGroupsById,
  getListMembers,
  uploadFile,
} from '@/redux/actions';
import type { IGroups } from '@/redux/actions/Interface';
import { hasEdited } from '@/redux/features/groups';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Main } from '@/templates/Main';
import { getFirstLetter } from '@/utils/func';

export default function DetailGroup() {
  const dispatch = useAppDispatch();
  const { query } = useRouter();

  const currentGroup = useAppSelector((state) => state.groups.currentGroup);
  const isUpdated = useAppSelector((state) => state.groups.isUpdated);
  const listMembers = useAppSelector((state) => state.members.listMembers);
  const {
    name = '',
    cover: coverImgProps = '',
    avatar: avatarProps = '',
    id = '',
    mode = 'PUBLIC',
    description = '',
    member = {},
  } = currentGroup;

  const isAdmin = member.role === MEMBERS.ROLE.ADMIN;

  const [active, setActive] = useState('1');
  const [coverImg, setCoverImg] = useState('');
  const [avatarImg, setAvatarImg] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newGroups, setNewGroups] = useState<IGroups>({
    name: '',
    description: '',
    mode: 'PUBLIC',
  });
  const [isDelete, setIsDelete] = useState(false);
  const [backGround, setBackGround] = useState('');

  const options = [
    {
      key: '1',
      title: 'Feed',
      content: <NewFeeds />,
    },
    {
      key: '2',
      title: 'Members',
      content: <Members />,
    },
    {
      key: '3',
      title: 'Photos',
      content: '',
    },
    {
      key: '4',
      title: 'Videos',
      content: '',
    },
  ];

  const handleUploadCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', e.target.files[0] as string | Blob);
      formData.append('scope', 'HIDDEN');
      dispatch(uploadFile(formData)).then((res: any) => {
        const { payload: { status = 0, data = '' } = {} } = res;
        if (status === 201) {
          toast.success('Upload success');
          setCoverImg(data.url);
          dispatch(editGroup({ id, payload: { cover: data.url } }));
        }
      });
    }
  };

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', e.target.files[0] as string | Blob);
      formData.append('scope', 'HIDDEN');
      dispatch(uploadFile(formData)).then((res: any) => {
        const { payload: { status = 0, data = '' } = {} } = res;
        if (status === 201) {
          toast.success('Upload success');
          setAvatarImg(data.url);
          dispatch(editGroup({ id, payload: { avatar: data.url } }));
        }
      });
    }
  };

  const optionsSelect = [
    {
      id: '1',
      value: 'PUBLIC',
      label: 'Public',
    },
    { id: '2', value: 'PRIVATE', label: 'Private' },
    { id: '3', value: 'HIDDEN', label: 'Hidden' },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setNewGroups({ ...newGroups, [e.target.name]: e.target.value });
  };

  const getTextByMode = () => {
    switch (newGroups.mode) {
      case 'PUBLIC':
        return <p>Everyone can see all posts of this group.</p>;
      case 'PRIVATE':
        return <p>Just member of group can see all posts of this group.</p>;
      case 'HIDDEN':
        return <p>Only you can see all posts of this group.</p>;
      default:
        return '';
    }
  };

  const getContentCreateGroups = () => {
    return (
      <div className="p-4 text-base">
        <div className="mb-4">
          <label htmlFor="">
            <span className="text-red-500">*</span> Name:
          </label>
          <Input
            className="mt-2"
            placeholder="Groups name"
            name="name"
            value={newGroups.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Description:</label>
          <textarea
            className="bg-main mt-2 block !h-32 w-full resize-none rounded-lg pl-4 pt-2 outline-none placeholder:text-base"
            name="description"
            value={newGroups.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Choose your mode:</label>
          <Select
            className="mt-2 block w-full"
            name="mode"
            options={optionsSelect}
            handleChange={handleChange}
            defaultValue={newGroups.mode}
          />
        </div>
        {getTextByMode()}
      </div>
    );
  };

  const onClose = () => {
    setOpenModal(false);
    setIsDelete(false);
  };

  const onSubmit = () => {
    if (isDelete) {
      dispatch(deleteGroup(id)).then((res: any) => {
        if (res.payload.status === 200) {
          onClose();
          toast.success('Delete group success!');
          router.push('/groups');
        }
      });
    } else {
      dispatch(editGroup({ id, payload: newGroups })).then((res: any) => {
        const { payload: { data: { group = {} } = {}, status = 200 } = {} } =
          res;
        if (status === 200) {
          onClose();
          dispatch(hasEdited(group));
        }
      });
    }
  };

  useEffect(() => {
    if (query.id) {
      dispatch(getGroupsById(query.id as string));
      dispatch(
        getListMembers({
          status: ['ACTIVE'],
          type: 'GROUP',
          group: query.id as string,
        })
      );
    }
  }, [query.id]);

  useEffect(() => {
    if (coverImgProps) {
      setCoverImg(coverImgProps);
    } else {
      setCoverImg('');
    }
  }, [coverImgProps]);

  useEffect(() => {
    if (coverImg)
      new FastAverageColor()
        .getColorAsync(coverImg)
        .then((color) => setBackGround(color.hex))
        .catch((e) => {
          console.log(e);
        });
  }, [coverImg]);

  useEffect(() => {
    if (avatarProps) {
      setAvatarImg(avatarProps);
    } else {
      setAvatarImg('');
    }
  }, [avatarProps]);

  useEffect(() => {
    if (currentGroup) setNewGroups({ name, description, mode });
  }, [currentGroup]);

  return (
    <Main
      className="!p-0 xl:!pl-[300px]"
      meta={<Meta title={`${name}`} description={`${name}`} />}
    >
      <div
        className={`w-full`}
        style={{
          backgroundImage: `linear-gradient(to top, white , ${backGround})`,
        }}
      >
        <div className="lg:mx-[5%] xl:mx-[10%]">
          <div className="relative max-h-full min-h-[285px]">
            <div className="absolute bottom-3 left-3 z-10 h-[120px] w-[120px] ">
              {avatarImg ? (
                <img
                  src={avatarImg}
                  alt="avatar-img"
                  className="h-full w-full rounded-full border-[3px] border-solid border-white object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-pink-400 text-white">
                  {getFirstLetter(name as string)}
                </div>
              )}

              {isAdmin && (
                <UploadButton
                  id="upload-avatar"
                  handleChange={handleUploadAvatar}
                  className="absolute bottom-0 right-0  cursor-pointer rounded-full border-2 border-white bg-primary-color p-1 "
                >
                  <Camera />
                </UploadButton>
              )}
            </div>
            <img
              src={
                coverImg ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiUvtkIL7TNaP5Md966DKyLLX8Qv-pFOpaQIPZiS-gZpnDgPa19fGVougiaSfftwtCcE&usqp=CAU'
              }
              alt="cover-img"
              id="cover"
              className="absolute top-1/2 right-0 bottom-0 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            />
            {isAdmin && (
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

          <div className="px-6 py-4">
            <h1 className="text-center sm:text-left">
              <strong>{name}</strong>
            </h1>
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="mt-2 flex items-center justify-center sm:justify-start">
                {listMembers.slice(0, 5).map((x: any, index) => (
                  <Tooltip key={x.id} description={x.user.name} direction="top">
                    <div
                      className={`h-12 w-12 cursor-pointer ${
                        index === 0 ? 'z-[1]' : '-ml-3'
                      }`}
                      onClick={() => router.push(`/user/${x.user.domain}`)}
                    >
                      <Avatar
                        src={x.user.avatar}
                        gender={x.user.gender}
                        alt="avatar-member"
                        className="h-full w-full border-2"
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-center sm:mt-0">
                <Button className="bg-pink-400 text-base">
                  <PlusIcon /> Invite
                </Button>
                {isAdmin && (
                  <Dropdown
                    content={[
                      {
                        id: '1',
                        title: (
                          <div className="flex items-center gap-2">
                            <PencilSquare />
                            <span>Edit group</span>
                          </div>
                        ),
                        handleClick: () => setOpenModal(true),
                      },
                      {
                        id: '2',
                        title: (
                          <div className="flex items-center gap-2">
                            <Trash />
                            <span>Delete this group</span>
                          </div>
                        ),
                        handleClick: () => {
                          setIsDelete(true);
                          setOpenModal(true);
                        },
                      },
                    ]}
                  >
                    <Button className="ml-2 bg-gray-600">
                      <BulletList />
                    </Button>
                  </Dropdown>
                )}
              </div>
            </div>

            <Divider />
            <Tabs
              options={options}
              defaultKey={active}
              handleChange={setActive}
              className="text-base"
            />
          </div>
        </div>
      </div>
      <TabsContent
        className="py-4 lg:mx-[5%] xl:mx-[10%]"
        options={options}
        active={active}
      />
      <Modal
        title={isDelete ? 'Delete this group' : 'Edit this group'}
        textSubmitButton={isDelete ? 'Delete now' : 'Edit now'}
        showModal={openModal}
        content={
          isDelete ? (
            <p className="text-center">
              Are you sure you want to delete this group?
            </p>
          ) : (
            getContentCreateGroups()
          )
        }
        onClose={onClose}
        onSubmit={onSubmit}
        loading={isUpdated}
      />
    </Main>
  );
}
