import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

import Divider from '@/components/common/Divider';
import CreatePost from '@/components/CreatePost';
import Briefcase from '@/components/Icons/Briefcase';
import Chain from '@/components/Icons/Chain';
import Heart from '@/components/Icons/Heart';
import Sad from '@/components/Icons/Sad';
import Smite from '@/components/Icons/Smite';
import Star from '@/components/Icons/Star';
import { getReletionCount } from '@/redux/actions';
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
  const { children = '', title = '', seeAll = true, showTotal = true } = props;
  return (
    <div className="mb-4 rounded-md bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="mb-2 inline-block font-medium text-black">{title}</h4>
          {showTotal && <span className="pl-2 text-base">12</span>}
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

  const {
    gender = '' || undefined,
    socialLinks = [] || undefined,
    hobbies = [] || undefined,
    work = '' || undefined,
  } = profileUser;

  useEffect(() => {
    dispatch(getReletionCount());
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <CreatePost />
      </div>
      <div>
        <Block title="Info" seeAll={false} showTotal={false}>
          <InfoContent
            icon={gender === 'male' ? <Smite width={30} /> : <Sad width={30} />}
            content={gender === 'male' ? 'Male' : 'Female'}
          />
          <InfoContent
            isLink
            content={socialLinks[0]}
            icon={<Chain width={30} />}
          />
          <InfoContent icon={<Heart width={30} />} content="Single" />
          <InfoContent icon={<Star width={30} />} content={hobbies[0]} />
          <Divider />
          <InfoContent icon={<Briefcase width={30} />} content={work} />
        </Block>
        <Block title="Albums">hehe</Block>
        <Block title="Following">hehe</Block>
        <Block title="Groups">hehe</Block>
      </div>
    </div>
  );
}
