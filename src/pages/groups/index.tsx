import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import MyGroups from '@/components/Groups/MyGroups';
import SuggestedGroups from '@/components/Groups/SuggestedGroups';
import PlusIcon from '@/components/Icons/PlusIcon';
import { Meta } from '@/layouts/Meta';
import { createNewGroups } from '@/redux/actions';
import type { IGroups } from '@/redux/actions/Interface';
import { hasCreatedNewGroup } from '@/redux/features/groups';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Main } from '@/templates/Main';

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

  const isUpdated = useAppSelector((state) => state.groups.isUpdated);

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

  return (
    <Main
      className="w-full overflow-hidden"
      meta={<Meta title="Groups | Roma" description="Groups | Roma" />}
    >
      <div className="my-4 sm:flex sm:justify-between">
        <Tabs
          options={options}
          optionClassName="!rounded-full text-base hover:bg-gray-400 rounded"
          defaultKey={active}
          handleChange={setActive}
          activeClassName="bg-secondary-color rounded text-white !py-1"
          className="no-scrollbar overflow-scroll whitespace-nowrap"
        />
        <Button
          className="mt-2 justify-center !rounded-full bg-secondary-color text-base text-white"
          onSubmit={() => setOpenModal(!openModal)}
        >
          <PlusIcon /> Create new group
        </Button>
      </div>
      <TabsContent active={active} options={options} className="px-4" />
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
