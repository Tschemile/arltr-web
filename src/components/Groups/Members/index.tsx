import router from 'next/router';
import React from 'react';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Divider from '@/components/common/Divider';
import Dropdown from '@/components/common/Dropdown';
import Input from '@/components/common/Input';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Logout from '@/components/Icons/Logout';
import Message from '@/components/Icons/Message';
import Search from '@/components/Icons/Search';
import { MEMBERS } from '@/constants/enum';
import type { IInfoUser } from '@/redux/actions/Interface';
import { useAppSelector } from '@/redux/hooks';

interface IMemberItem {
  member: IInfoUser;
  role?: string;
  IdMember: string;
}

const MemberItem = (props: IMemberItem) => {
  const { MEMBER } = MEMBERS.ROLE;
  const { member = {}, role = MEMBER, IdMember = '' } = props;
  console.log(IdMember);
  const {
    id = '',
    domain = '',
    avatar = '',
    gender = '',
    name = '',
    createdAt = '',
  } = member;
  const { id: currentId = '' } = useAppSelector(
    (state) => state.auth.currentUser
  );
  const handleOutGroup = () => {};
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div
          className="mr-4 h-[45px] w-[45px] cursor-pointer"
          onClick={() => router.push(`/user/${domain}`)}
        >
          <Avatar
            src={avatar}
            alt="avatar"
            width={50}
            className="m-auto h-full w-full rounded-full"
            gender={gender}
          />
        </div>
        <div className="">
          <h3
            className="cursor-pointer text-base font-medium"
            onClick={() => router.push(`/user/${domain}`)}
          >
            {name}
          </h3>
          {role === 'ADMIN' && (
            <span className="rounded bg-blue-200 px-2 py-1 text-xs text-blue-500">
              Admin
            </span>
          )}
          <p className="text-xs">
            Joined at {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      {id === currentId ? (
        <Dropdown
          content={[
            {
              id: '1',
              title: (
                <div className="flex items-center gap-2">
                  <Logout /> Out group
                </div>
              ),
              handleClick: () => handleOutGroup(),
            },
          ]}
        >
          <Button className="bg-gray-400">
            <EllipsisHorizon />
          </Button>
        </Dropdown>
      ) : (
        <Button className="bg-gray-400 text-base">
          <Message /> Chat
        </Button>
      )}
    </div>
  );
};

export default function Members() {
  const { ADMIN, MEMBER } = MEMBERS.ROLE;
  const listMembers = useAppSelector((state) => state.members.listMembers);
  const totalMembers = useAppSelector((state) => state.members.totalMembers);

  return (
    <div className="md:mx-[10%] lg:mx-[15%]">
      <Card>
        <div className="">
          <h3>
            <strong>Members</strong> · {totalMembers}{' '}
          </h3>
          <p className="my-2 text-base">
            New people who joined this group will show up here.
          </p>
          <Input
            placeholder="Search some members..."
            inpulClassName="!rounded-full text-base"
            icons={<Search />}
          />
        </div>
        <Divider />
        <h4 className="text-base">
          <strong>Admin</strong> ·{' '}
          {listMembers.filter((x) => x.role === ADMIN).length}
        </h4>
        <p className="my-2 text-base">
          Admin who can manage members, moderation and settings and posts in
          this group!
        </p>
        {listMembers
          .filter((x) => x.role === ADMIN)
          .map((y: Record<string, string>) => {
            const { id = '' } = y.user as IInfoUser;
            const { role = MEMBER, id: IdMember = '' } = y;
            return (
              <MemberItem
                key={id}
                role={role}
                IdMember={IdMember}
                member={y.user as IInfoUser}
              />
            );
          })}
        <Divider />
        <h4 className="text-base">
          <strong>All members</strong> · {listMembers.length}
        </h4>
        <p className="my-2 text-base">
          This list includes people who have joined the group. Anyone invited
          and approved can preview the content in the group.
        </p>
        {listMembers.map((y: Record<string, string>) => {
          const { id = '' } = y.user as IInfoUser;
          const { role = MEMBER, id: IdMember = '' } = y;
          return (
            <MemberItem
              key={id}
              role={role}
              IdMember={IdMember}
              member={y.user as IInfoUser}
            />
          );
        })}
      </Card>
    </div>
  );
}
