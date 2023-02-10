import type { ChangeEvent } from 'react';
import { useState } from 'react';

import ActionButton from '@/components/common/ActionButton';
import Avatar from '@/components/common/Avatar';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import UploadButton from '@/components/common/UploadButton';
import CreatePost from '@/components/CreatePost';
import NewsFeed from '@/components/Home/NewsFeed';
import SideMenu from '@/components/Home/SideMenu';
import StoryCarousels from '@/components/Home/StoryCarousels';
import Comment from '@/components/Icons/Comment';
import { Meta } from '@/layouts/Meta';
import { createPost, uploadFile } from '@/redux/actions';
import type { ICreatePost } from '@/redux/actions/Interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Main } from '@/templates/Main';

const Index = () => {
  const dispatch = useAppDispatch();
  const isUpdatePost = useAppSelector((state) => state.posts.isUpdatePost);
  const {
    avatar = '',
    name = '',
    gender = '',
  } = useAppSelector((state) => state.auth.currentUser);

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);
  const [fileDataURL, setFileDataURL] = useState<string[]>([]);
  const [mode, setMode] = useState('PUBLIC');

  const onClose = () => {
    setOpenModal(false);
    setContent('');
    setFileDataURL([]);
    setMode('PUBLIC');
  };

  const onSubmit = () => {
    const newPost = { type: 'POST', content, images: fileDataURL, mode };
    dispatch(createPost(newPost as ICreatePost)).then((res: any) => {
      if (res.payload?.status === 201) {
        setOpenModal(false);
        setContent('');
        setFileDataURL([]);
        setListPosts([res.payload.data.post, ...listPosts]);
      }
    });
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
    if (fileDataURL.length <= 2) {
      return fileDataURL.map((x: any) => (
        <div key={x} className="h-[150px] w-full">
          <img
            className="h-full w-full rounded object-cover"
            src={x}
            alt="post-img"
          />
        </div>
      ));
    }

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
                gender={gender}
                className="h-full w-full"
              />
            </div>
            <div>
              <p className="text-lg font-medium sm:text-xl">{name}</p>
              <Select
                className="mt-2 w-52"
                handleChange={handleSelect}
                options={[
                  {
                    id: '1',
                    value: 'PUBLIC',
                    label: 'Public 🌍',
                  },
                  { id: '2', value: 'PRIVATE', label: 'Private 🔒' },
                  { id: '3', value: 'FRIEND', label: 'Friend 👭' },
                ]}
                name="mode"
                defaultValue={mode}
              />
            </div>
          </div>
          <div className="my-4">
            <textarea
              className="h-[200px] w-full resize-none py-1 outline-none placeholder:text-base placeholder:text-gray-500"
              placeholder={`What is your mind? ${name} !`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              maxLength={500}
            />
          </div>
          {fileDataURL?.length > 0 && getLayout()}
        </>
        <div className="my-4 grid grid-cols-3 gap-2">
          <UploadButton
            className="cursor-pointer"
            id="upload-file-post"
            multiple
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
  return (
    <Main meta={<Meta title="I ♥ U" description="I ♥ U" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-6 lg:mx-[15%] ">
          <StoryCarousels />
          <div className="mt-2 lg:mx-[5%]">
            <CreatePost setOpenModal={setOpenModal} />
            <NewsFeed />
          </div>
        </div>
        <SideMenu />
      </div>
      <Modal
        title={'Create New Post'}
        textSubmitButton={'Create Post'}
        showModal={openModal}
        content={getContent()}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={isUpdatePost}
      />
    </Main>
  );
};

export default Index;
