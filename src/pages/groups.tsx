import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Carousels from '@/components/common/Carousels';
import Divider from '@/components/common/Divider';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import { Meta } from '@/layouts/Meta';
import { createNewGroups } from '@/redux/actions';
import type { INewGroups } from '@/redux/actions/Interface';
import { useAppDispatch } from '@/redux/hooks';
import { Main } from '@/templates/Main';

const Groups = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState('suggestedGroups');
  const [openModal, setOpenModal] = useState(false);
  const [newGroups, setNewGroups] = useState<INewGroups>({
    name: '',
    description: '',
    mode: 'PUBLIC',
  });
  const options = [
    {
      key: 'suggestedGroups',
      title: 'Suggested Groups',
      content: '',
    },
    {
      key: 'myGroups',
      title: 'My Groups',
      content: '',
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
    { id: '3', value: 'FRIEND', label: 'Friend' },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setNewGroups({ ...newGroups, [e.target.name]: e.target.value });
  };

  const getTextByMode = () => {
    switch (newGroups.mode) {
      case 'PUBLIC':
        return <p>Everyone can see and join this group.</p>;
      case 'FRIEND':
        return <p>Only your friend can see and join this group.</p>;
      case 'PRIVATE':
        return <p>Just member of group can see this group.</p>;
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Description:</label>
          <textarea
            className="bg-main mt-2 block !h-32 w-full resize-none rounded-lg pl-4 pt-2 outline-none placeholder:text-base"
            name="description"
            onChange={(e) => handleChange(e)}
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
  };

  const onSubmit = () => {
    if (newGroups.name) {
      dispatch(createNewGroups(newGroups)).then((res: any) => {
        if (res.payload.status === 201) {
          toast.success('Your group has created!');
          setOpenModal(false);
        }
      });
    }
  };

  return (
    <Main meta={<Meta title="Fall in luv ❤️" description="Fall in luv ❤️" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 lg:col-span-6 xl:ml-[20%]">
          <p className="my-4">Popular Groups</p>
          <Carousels childClassName="w-1/2 lg:w-1/3">
            {[...Array(10)].map((_, index) => (
              <Card
                key={index}
                img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
                className="mx-1 text-left"
                imgClassName="!min-h-[100px] cursor-pointer"
              >
                <h1>Group {index}</h1>
                <p className="text-sm">1 Members 50posts</p>
                <div className="my-1 flex items-center text-sm">
                  <div className="mr-1 flex cursor-pointer -space-x-2 overflow-hidden">
                    <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                    <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                  </div>
                  See all Members
                </div>
                <div className="flex justify-between">
                  <Button className="mr-1 h-8 w-full justify-center text-sm">
                    Join
                  </Button>
                  <Button className="ml-1 h-8 w-full justify-center bg-gray-400 text-sm text-black">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </Carousels>
          <p className="mt-4">Categories</p>
          <p className="mb-4 text-sm">
            Find A Group By Browsing Top Categories
          </p>
          <Carousels childClassName="w-1/3 sm:w-1/4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="relative m-1 min-h-[120px] cursor-pointer overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
                  className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover hover:scale-125`}
                  alt="image"
                />
                <p className="absolute left-2 bottom-1 text-white">Animals</p>
              </div>
            ))}
          </Carousels>
          <p className="mt-4">Suggested Groups</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[...Array(10)].map((_, index) => (
              <Card
                key={index}
                img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
                className="text-left hover:-translate-y-1"
                imgClassName="!min-h-[100px] cursor-pointer"
              >
                <h1>Group {index}</h1>
                <p className="text-sm">1 Members 50posts</p>
                <div className="my-1 flex items-center text-sm">
                  <div className="mr-1 flex cursor-pointer -space-x-2 overflow-hidden">
                    <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                    <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                  </div>
                  See all Members
                </div>
                <div className="flex justify-between">
                  <Button className="mr-1 h-8 w-full justify-center text-sm">
                    Join
                  </Button>
                  <Button className="ml-1 h-8 w-full justify-center bg-gray-400 text-sm text-black">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="col-span-2 hidden h-fit p-2 shadow-lg lg:block">
          <h1 className="mb-2 text-xl">Groups</h1>
          <Tabs
            options={options}
            optionClassName="!block text-base hover:bg-pink-200 rounded"
            defaultKey={active}
            handleChange={setActive}
            activeClassName="bg-pink-400 rounded text-white"
          />
          <Button
            className="mt-2 w-full justify-center bg-pink-400 text-base text-white"
            onSubmit={() => setOpenModal(!openModal)}
          >
            + Create
          </Button>
          <Divider />
          <div className="flex justify-between text-base">
            Suggested Groups <a>See all</a>
          </div>
          <div className="flex h-16 w-full items-center rounded px-3 py-2 hover:bg-pink-200">
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
          <div className="flex justify-between text-base">My Groups</div>
          {[...Array(3)].map((_, index) => (
            <div
              className="flex h-16 w-full items-center rounded px-3 py-2 hover:bg-pink-200"
              key={index}
            >
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
      />
    </Main>
  );
};

export default Groups;
