import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Divider from '@/components/common/Divider';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import PlusIcon from '@/components/Icons/PlusIcon';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Pages = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tabsKey, setTabsKey] = useState('1');
  const options = [
    {
      key: '1',
      title: 'Popular Pages',
      content: '',
    },
    {
      key: '2',
      title: 'Your Pages',
      content: '',
    },
    {
      key: '3',
      title: 'Liked Pages',
      content: '',
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      domain: '',
      category: 'Music',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      domain: Yup.string().required('Domain is required'),
    }),
    onSubmit: (page) => {
      // dispatch(register(user)).then((result: any) => {
      //   if (result.payload?.status === 201) {
      //     router.push('/verify-email');
      //     toast.info(result.payload.data.message);
      //   }
      // });
      console.log(page);
    },
  });

  const getContentCreatePage = () => {
    const { errors = {}, submitCount = 0 } = formik;
    return (
      <form onSubmit={formik.handleSubmit} className="text-base">
        <div className="mb-4">
          <label>
            Name <span className="text-red-500">*</span>:
          </label>
          <Input
            placeholder="Enter name ..."
            className="mt-2"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {errors.name && submitCount > 0 && (
            <p className="mt-4 text-red-500">*{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label>
            Domain <span className="text-red-500">*</span>:
          </label>
          <Input
            placeholder="Enter domain ..."
            className="mt-2"
            name="domain"
            onChange={formik.handleChange}
            value={formik.values.domain}
          />
          {errors.domain && submitCount > 0 && (
            <p className="mt-4 text-red-500">*{errors.domain}</p>
          )}
        </div>
        <div className="mb-4">
          <label>
            Category <span className="text-red-500">*</span>:
          </label>
          <Select
            options={[
              { id: '1', value: 'MUSIC', label: 'Music' },
              { id: '2', value: 'Entertainment', label: 'Entertainment' },
            ]}
            name="category"
            handleChange={formik.handleChange}
            defaultValue={formik.values.category}
            className="mt-2 block w-full"
          />
        </div>
      </form>
    );
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <Main meta={<Meta title="U me ❤️" description="U me ❤️" />}>
      <div className="lg:pr-[350px]">
        <div className="my-4 sm:flex sm:items-center sm:justify-between lg:hidden">
          <Tabs
            options={options}
            optionClassName="!rounded-full text-base hover:bg-gray-400 rounded"
            defaultKey={tabsKey}
            handleChange={setTabsKey}
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
        <p className="mt-4">Suggested Pages</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              img="https://i.pinimg.com/originals/3f/3d/93/3f3d934ef3b86c349587401f94cf865a.jpg"
              className="text-left transition-all hover:-translate-y-1"
              imgClassName="min-h-[150px] cursor-pointer"
            >
              <h1 className="font-semibold">Page {index}</h1>
              <p className="text-sm">Shopping</p>
              <div className="my-1 flex items-center text-sm">
                5k people like this
              </div>
              <div className="flex items-stretch">
                <Button className="ml-1 h-8 w-full justify-center text-sm">
                  Like
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed right-0 top-[60px] hidden h-full bg-secondary-color p-2 shadow-2xl lg:block lg:min-w-[350px]">
        <h1 className="text-xl">Pages</h1>
        <Tabs
          options={options}
          optionClassName="text-base hover:bg-gray-400 rounded !block my-2"
          defaultKey={tabsKey}
          handleChange={setTabsKey}
          activeClassName="bg-secondary-color rounded text-white !py-1"
          // className="no-scrollbar  overflow-scroll whitespace-nowrap"
        />
        <Divider />
        <Button
          className="mt-4 w-full justify-center text-base text-white"
          onSubmit={() => setOpenModal(!openModal)}
        >
          + Create
        </Button>
      </div>
      <Modal
        title="Create new page"
        textSubmitButton="Create now"
        showModal={openModal}
        content={getContentCreatePage()}
        onClose={onClose}
        onSubmit={formik.handleSubmit}
        // loading={isUpdated}
      />
    </Main>
  );
};

export default Pages;
