import router from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import { baseURL } from '@/api';
import CardPost from '@/components/CardPost';
import Divider from '@/components/common/Divider';
import CreatePost from '@/components/CreatePost';
import Briefcase from '@/components/Icons/Briefcase';
import Chain from '@/components/Icons/Chain';
import Heart from '@/components/Icons/Heart';
import Sad from '@/components/Icons/Sad';
import Smite from '@/components/Icons/Smite';
import Star from '@/components/Icons/Star';
import { createPost } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface InfoContentProps {
  icon: ReactNode;
  content: string | undefined;
  isLink?: boolean;
}

interface BlockProps {
  title: string;
  children: ReactNode;
  seeAll?: boolean;
  showTotal?: boolean;
  total?: string | number;
}

const InfoContent = (props: InfoContentProps) => {
  const { icon = '', content = '', isLink = false } = props;
  return (
    <div className="mb-4 flex items-center break-all text-sm">
      {icon}
      {isLink ? (
        <a href={content} className="pl-2">
          {content}
        </a>
      ) : (
        <span className="pl-2">{content}</span>
      )}
    </div>
  );
};

const Block = (props: BlockProps) => {
  const {
    children = '',
    title = '',
    seeAll = true,
    total = 0,
    showTotal = true,
  } = props;
  return (
    <div className="mb-4 rounded-md bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="mb-2 inline-block font-medium text-black">{title}</h4>
          {showTotal && (
            <span className="pl-2 text-base">{`(${total || 0})`}</span>
          )}
        </div>
        {seeAll && (
          <span className="cursor-pointer rounded px-2 py-1 text-xs text-blue-600 hover:bg-primary-color">
            See all
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default function Timeline() {
  const dispatch = useAppDispatch();
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const listComments = useAppSelector((state) => state.comments.listComment);

  const {
    gender = '',
    socialLinks = [],
    hobbies = [],
    work = '',
    posts = [],
    albums = [],
    followings = [],
    groups = [],
    totalFollowing = 0,
    totalAlbums = 0,
  } = profileUser;

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);

  const onClose = () => {
    setOpenModal(false);
  };

  const onSubmit = () => {
    dispatch(createPost({ type: 'POST', content })).then((res: any) => {
      if (res.payload.status === 201) {
        setOpenModal(false);
        setContent('');
        setListPosts([...posts, res.payload.data.post]);
      }
    });
  };

  useEffect(() => {
    setListPosts(posts as []);
  }, [JSON.stringify(posts)]);

  return (
    <div className="grid gap-2 md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        <CreatePost
          openModal={openModal}
          onClose={onClose}
          onSubmit={onSubmit}
          setContent={setContent}
          setOpenModal={setOpenModal}
        />
        {(listPosts as Record<string, string>[])?.map((x) => (
          <CardPost post={x} key={x.id} listComments={listComments}>
            {x.content}
          </CardPost>
        ))}
      </div>

      <div className="row-start-1 h-full md:row-start-auto">
        <Block title="Info" seeAll={false} showTotal={false}>
          <InfoContent
            icon={gender === 'male' ? <Smite width={30} /> : <Sad width={30} />}
            content={gender === 'male' ? 'Male' : 'Female'}
          />
          <InfoContent
            isLink
            content={socialLinks && socialLinks[0]}
            icon={<Chain width={30} />}
          />
          <InfoContent icon={<Heart width={30} />} content="Single" />
          <InfoContent
            icon={<Star width={30} />}
            content={hobbies && hobbies[0]}
          />
          <Divider />
          <InfoContent icon={<Briefcase width={30} />} content={work} />
        </Block>
        <Block total={totalAlbums} title="Albums">
          <div className="grid grid-cols-3 gap-2">
            {(albums as []).slice(0, 9).map((x: any) => (
              <div key={x.id} className="col-span-1 h-[100px] w-full">
                <img
                  alt="photo"
                  src={`${baseURL}/file/${x.filename}`}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </Block>

        <Block title="Following" total={totalFollowing}>
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
        <Block title="Groups">{(groups as []).map((x) => x)}</Block>
      </div>
    </div>
  );
}
