import router from 'next/router';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import Tooltip from '@/components/common/Tooltip';
import MyGroups from '@/components/Groups/MyGroups';
import SuggestedGroups from '@/components/Groups/SuggestedGroups';
import { GROUPS } from '@/constants/enum';
import { Meta } from '@/layouts/Meta';
import { createNewGroups, getListGroups } from '@/redux/actions';
import type { IGroups } from '@/redux/actions/Interface';
import { hasCreatedNewGroup } from '@/redux/features/groups';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Main } from '@/templates/Main';
import { getFirstLetter } from '@/utils/func';

const Groups = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState('suggestedGroups');
  const [openModal, setOpenModal] = useState(false);
  const [newGroups, setNewGroups] = useState<IGroups>({
    name: '',
    description: '',
    mode: 'PUBLIC',
  });

  // const [limit, setLimit] = useState(9);

  const { id: userId = '' } = useAppSelector((state) => state.auth.currentUser);
  const isUpdated = useAppSelector((state) => state.groups.isUpdated);
  const listGroups = useAppSelector((state) => state.groups.listGroups);

  const options = [
    {
      key: 'suggestedGroups',
      title: 'Suggested Groups',
      content: <SuggestedGroups />,
    },
    {
      key: 'myGroups',
      title: 'My Groups',
      content: <MyGroups />,
    },
    {
      key: 'joinedGroups',
      title: 'Joined Groups',
      content: '',
    },
  ];

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
            onChange={handleChange}
            value={newGroups.name}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Description:</label>
          <textarea
            className="mt-2 block !h-32 w-full resize-none rounded-lg bg-primary-color pl-4 pt-2 outline-none placeholder:text-base"
            name="description"
            onChange={(e) => handleChange(e)}
            value={newGroups.description}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Choose your mode:</label>
          <Select
            className="mt-2 block w-full"
            name="mode"
            options={optionsSelect}
            handleChange={(e) => handleChange(e)}
            defaultValue={newGroups.mode}
          />
        </div>
        {getTextByMode()}
      </div>
    );
  };

  const onClose = () => {
    setOpenModal(false);
    setNewGroups({
      name: '',
      description: '',
      mode: 'PUBLIC',
    });
  };

  const onSubmit = () => {
    if (newGroups.name) {
      dispatch(createNewGroups(newGroups)).then((res: any) => {
        if (res.payload.status === 201) {
          toast.success('Your group has created!');
          dispatch(hasCreatedNewGroup(res.payload.data.group));
          setNewGroups({
            name: '',
            description: '',
            mode: 'PUBLIC',
          });
          setOpenModal(false);
        }
      });
    }
  };

  useEffect(() => {
    if (userId)
      dispatch(
        getListGroups({ type: GROUPS.TYPE.USER, limit: 9, user: userId })
      );
  }, [userId]);

  return (
    <Main meta={<Meta title="Groups | Roma" description="Groups | Roma" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 lg:col-span-6">
          <div className="my-4 sm:flex sm:justify-between lg:hidden">
            <Tabs
              options={options}
              optionClassName="!rounded-full text-base hover:bg-gray-400 rounded"
              defaultKey={active}
              handleChange={setActive}
              activeClassName="bg-primary-backgroundColor rounded text-white !py-1"
              className="no-scrollbar overflow-scroll whitespace-nowrap"
            />
            <Button
              className="mt-2 justify-center !rounded-full bg-primary-backgroundColor text-base text-white"
              onSubmit={() => setOpenModal(!openModal)}
            >
              + Create new group
            </Button>
          </div>
          <TabsContent active={active} options={options} className="px-4" />
        </div>

        <div className="col-span-2 hidden h-fit p-2 shadow-lg lg:block">
          <h1 className="mb-2 text-xl">
            <strong>Groups</strong>
          </h1>
          <Tabs
            options={options}
            optionClassName="!block text-base hover:bg-gray-400 rounded"
            defaultKey={active}
            handleChange={setActive}
            activeClassName="bg-primary-backgroundColor rounded text-white"
          />
          <Button
            className="mt-2 w-full justify-center bg-primary-backgroundColor text-base text-white"
            onSubmit={() => setOpenModal(!openModal)}
          >
            + Create
          </Button>
          <Divider />
          <div className="flex justify-between text-base">
            <strong> Suggested Groups</strong> <a>See all</a>
          </div>
          <div className="flex h-16 w-full items-center rounded px-3 py-2 hover:bg-gray-400">
            <div className="relative mr-2 min-h-full w-1/4 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://i.pinimg.com/originals/34/72/b4/3472b42c7167bb8bea4ff833e83708fa.jpg"
                className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover`}
                alt="image"
              />
            </div>
            <div>
              <p className="text-base">Rabbit</p>
              <p className="text-sm">Animals</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between text-base">
            <strong>My Groups</strong>{' '}
            <span
              className="cursor-pointer text-blue-700 hover:opacity-75"
              onClick={() => setActive('myGroups')}
            >
              See all
            </span>
          </div>
          {listGroups.slice(0, 3).map((x) => (
            <div
              className="grid h-16 w-full grid-cols-4 gap-2 rounded px-3 py-2 hover:bg-gray-400"
              key={x.id}
            >
              <div
                className="relative mr-2 min-h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => router.push(`/groups/${x.id}`)}
              >
                {x.avatar ? (
                  <img
                    src={x.avatar}
                    className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover`}
                    alt="image"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary-backgroundColor text-white">
                    {getFirstLetter(x.name as string)}
                  </div>
                )}
              </div>
              <div className="col-span-3">
                <Tooltip direction="top" description={x.name}>
                  <p
                    className="w-3/4 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-base"
                    onClick={() => router.push(`/groups/${x.id}`)}
                  >
                    {x.name}
                  </p>
                </Tooltip>
                <p className="text-sm">
                  {new Date(x.createdAt as string).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Create new groups"
        textSubmitButton="Create now"
        showModal={openModal}
        content={getContentCreateGroups()}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={isUpdated}
      />
    </Main>
  );
};

export default Groups;
