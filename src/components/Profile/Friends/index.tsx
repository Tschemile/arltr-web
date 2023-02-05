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
          return (
            <Card
              img={val.user?.avatar || val.avatar}
              key={val.id}
              onClickImg={() =>
                router.push(`/user/${val.domain || val.user?.domain}`)
              }
              imgClassName="cursor-pointer"
            >
              <div
                onClick={() =>
                  router.push(`/user/${val.domain || val.user?.domain}`)
                }
                className="cursor-pointer"
              >
                {val.user?.name || val.name}
              </div>

              <p className="mb-1 overflow-hidden text-ellipsis text-sm">
                {val.user?.about || val.about || 'siu 🥵'}
              </p>

              <Button
                type="button"
                className="w-full justify-center bg-[#dbeafe] text-sm text-[#71a7f2]"
                onSubmit={
                  val.type === 'BLOCKED'
                    ? () =>
                        dispatch(
                          changeRelation({
                            user: val.user.id,
                            type: 'BLOCKED',
                            status: 'REJECT',
                          })
                        )
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
  const [active, setIsActive] = useState<IInRelation['type']>('FRIEND');
  const dispatch = useAppDispatch();
  const { listRelation: allRelation } = useAppSelector(
    (state) => state.relation
  );

  const listRelation = isCurrentUser
    ? allRelation
    : profileUser[typeUser[active]];

  useEffect(() => {
    if (isCurrentUser) dispatch(getListRelation({ type: active }));
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
      key: 'BLOCKED',
      title: `Blocked (${profileUser.totalBlocks})`,
      content: <Grid data={listRelation} />,
    },
  ];
  return (
    <Card>
      <p>Friends</p>
      <Tabs
        options={options}
        defaultKey={active}
        handleChange={(key: any) => setIsActive(key)}
      />
      <TabsContent options={options} active={active} className="min-h-[40vh]" />
    </Card>
  );
}
