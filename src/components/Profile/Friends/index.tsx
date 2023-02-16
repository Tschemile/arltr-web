import router from 'next/router';
import React, { useEffect, useState } from 'react';

import TabsContent from '@/components/common/Tabs/TabsContent';
import { typeUser } from '@/constants';
import { changeRelation, getListRelation } from '@/redux/actions';
import type { IInRelation } from '@/redux/actions/Interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Button from '../../common/Button';
import Card from '../../common/Card';
import Tabs from '../../common/Tabs';

interface TabsProps {
  isCurrentUser: boolean;
  profileUser: Record<string, string>;
}

interface GridProps {
  data: Array<any> | undefined | string;
}

const Grid = (props: GridProps) => {
  const dispatch = useAppDispatch();
  const { data = [] } = props;
  return data?.length ? (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {(data as []).map((val: Record<string, string | undefined | any>) => {
          const person =
            val.status === 'REQUESTING' ||
            (val.type === 'FRIEND' && val.status === 'ACCEPTED')
              ? val.requester
              : val.user || val;
          return (
            <Card
              img={person?.avatar}
              key={val.id}
              onClickImg={() => router.push(`/user/${person?.domain}`)}
              imgClassName="cursor-pointer"
            >
              <div
                onClick={() => router.push(`/user/${person?.domain}`)}
                className="cursor-pointer"
              >
                {person?.name}
              </div>

              <p className="mb-1 overflow-hidden text-ellipsis text-sm">
                {person?.about || 'siu 🥵'}
              </p>

              <Button
                type="button"
                className="w-full justify-center bg-[#dbeafe] text-sm text-[#71a7f2]"
                onSubmit={
                  // eslint-disable-next-line no-nested-ternary
                  val.type === 'BLOCKED'
                    ? () =>
                        dispatch(
                          changeRelation({
                            user: person.id,
                            type: 'BLOCKED',
                            status: 'REJECT',
                          })
                        )
                    : val.type === 'FRIEND'
                    ? () => {
                        dispatch(
                          changeRelation({
                            user: person.id,
                            type: 'FRIEND',
                            status: 'ACCEPTED',
                          })
                        );
                      }
                    : () => {}
                }
              >
                {val.type === 'BLOCKED'
                  ? 'Unblock'
                  : typeUser[val.type as IInRelation['type']] || 'Following'}
              </Button>
            </Card>
          );
        })}
      </div>
      <Button className="m-auto mt-4">load more</Button>
    </>
  ) : (
    <p className="text-center">Poor for you, dont have fen 😢</p>
  );
};

export default function Friends(props: TabsProps) {
  const { isCurrentUser = false, profileUser = {} } = props;
  const [active, setIsActive] = useState<IInRelation['type'] | 'REQUESTER'>(
    'FRIEND'
  );
  const dispatch = useAppDispatch();
  const { listRelation: allRelation } = useAppSelector(
    (state) => state.relation
  );

  const currentRelation =
    active === 'REQUESTER'
      ? allRelation?.filter((x: any) => x.requester.id !== profileUser.id)
      : allRelation;

  const listRelation = isCurrentUser
    ? currentRelation
    : profileUser[typeUser[active === 'REQUESTER' ? 'FRIEND' : active]];

  useEffect(() => {
    if (isCurrentUser)
      if (active !== 'FRIEND' && active !== 'REQUESTER')
        dispatch(getListRelation({ type: active as IInRelation['type'] }));
      else if (active === 'FRIEND')
        dispatch(getListRelation({ type: 'FRIEND', status: ['ACCEPTED'] }));
      else if (active === 'REQUESTER')
        dispatch(getListRelation({ type: 'FRIEND', status: ['REQUESTING'] }));
  }, [active]);

  const options = [
    {
      key: 'FRIEND',
      title: `All Friends (${profileUser.totalFriends})`,
      content: <Grid data={listRelation} />,
    },
    {
      key: 'FOLLOWING',
      title: `Following (${profileUser.totalFollowing})`,
      content: <Grid data={listRelation} />,
    },
    {
      key: 'FOLLOWER',
      title: `Follower (${profileUser.totalFollowers})`,
      content: <Grid data={listRelation} />,
    },
    {
      key: 'REQUESTER',
      title: `Requester (${profileUser.totalBlocks})`,
      content: <Grid data={listRelation} />,
    },
    {
      key: 'BLOCKED',
      title: `Blocked (${profileUser.totalBlocks})`,
      content: <Grid data={listRelation} />,
    },
  ];
  return (
    <Card>
      <p>Friends</p>
      <Tabs
        options={isCurrentUser ? options : options.slice(0, -2)}
        defaultKey={active}
        handleChange={(key: any) => setIsActive(key)}
        className="no-scrollbar overflow-y-scroll whitespace-nowrap"
      />
      <TabsContent
        options={isCurrentUser ? options : options.slice(0, -1)}
        active={active}
        className="min-h-[40vh]"
      />
    </Card>
  );
}
