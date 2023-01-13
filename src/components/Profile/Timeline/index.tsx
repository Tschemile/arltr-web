import type { ReactNode } from 'react';
import React from 'react';

import CardPost from '@/components/CardPost';
import Divider from '@/components/common/Divider';
import CreatePost from '@/components/CreatePost';
import Briefcase from '@/components/Icons/Briefcase';
import Chain from '@/components/Icons/Chain';
import Heart from '@/components/Icons/Heart';
import Sad from '@/components/Icons/Sad';
import Smite from '@/components/Icons/Smite';
import Star from '@/components/Icons/Star';
import { useAppSelector } from '@/redux/hooks';

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
  total?: number;
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
    total = '',
    showTotal = true,
  } = props;
  return (
    <div className="mb-4 rounded-md bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="mb-2 inline-block font-medium text-black">{title}</h4>
          {showTotal && <span className="pl-2 text-base">{`(${total})`}</span>}
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
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const totalFollowing = useAppSelector(
    (state) => state.profile.totalRelation?.totalFollowing
  );
  const {
    gender = '' || undefined,
    socialLinks = [] || undefined,
    hobbies = [] || undefined,
    work = '' || undefined,
  } = profileUser;

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <CreatePost />
        <CardPost img="https://cdn.lazi.vn/timthumb.php?src=storage/uploads/users/avatar/1502200931_maxresdefault.jpg&w=300&h=300">
          Conan Kun
        </CardPost>
        <CardPost img="https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/review/phim/anime-naruto.jpg">
          How are you bro?
        </CardPost>
        <CardPost>Hehe</CardPost>
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
        <Block title="Following" total={totalFollowing}>
          hehe
        </Block>
        <Block title="Groups">hehe</Block>
      </div>
    </div>
  );
}
