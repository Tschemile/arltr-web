import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import Modal from '@/components/common/Modal';
import CreatePost from '@/components/CreatePost';
import ContentModal from '@/components/CreatePost/ContentModal';
import NewsFeed from '@/components/Home/NewsFeed';
import SideMenu from '@/components/Home/SideMenu';
import StoryCarousels from '@/components/Home/StoryCarousels';
import { Meta } from '@/layouts/Meta';
import { createPost, uploadFile } from '@/redux/actions';
import type { ICreatePost } from '@/redux/actions/Interface';
import { clearListPosts } from '@/redux/features/posts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Main } from '@/templates/Main';

const Index = () => {
  const dispatch = useAppDispatch();
  const isUpdatePost = useAppSelector((state) => state.posts.isUpdatePost);

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

  useEffect(() => {
    return () => {
      dispatch(clearListPosts());
    };
  }, []);

  return (
    <Main meta={<Meta title="Home | Roma" description="Home | Roma" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-6 lg:mx-[15%]">
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
    </Main>
  );
};

export default Index;
