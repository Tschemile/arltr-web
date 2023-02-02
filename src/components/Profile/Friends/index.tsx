import router from 'next/router';
import React, { useEffect, useState } from 'react';

import TabsContent from '@/components/common/Tabs/TabsContent';
import { notUser } from '@/constants';
import { getListFriend } from '@/redux/actions';
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
  const { data = [] } = props;
  return data?.length ? (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {(data as []).map((val: Record<string, string | undefined | any>) => (
          <Card img={val.requester?.avatar || val.avatar} key={val.id}>
            <div
              onClick={() => router.push(`/user/${val.domain}`)}
              className="cursor-pointer"
            >
              {val.requester?.name || val.name}
            </div>
            <p className="mb-1 text-sm">{val.about}</p>
            {val.following && (
              <p className="mb-1 text-sm">{val.following} Following</p>
            )}
            <Button
              type="button"
              className="w-full justify-center bg-[#dbeafe] text-sm text-[#71a7f2]"
            >
              Following
            </Button>
          </Card>
        ))}
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
  const {
    // isLoading: { loadingListFriend },
    listFriend: allFriend,
  } = useAppSelector((state) => state.relation);

  const listFriend = isCurrentUser ? allFriend : profileUser[notUser[active]];

  useEffect(() => {
    if (isCurrentUser) dispatch(getListFriend({ type: active }));
  }, [active]);

  const options = [
    {
      key: 'FRIEND',
      title: `All Friends (${profileUser.totalFriends})`,
      content: <Grid data={listFriend} />,
    },
    {
      key: 'FOLLOWING',
      title: `Following (${profileUser.totalFollowing})`,
      content: <Grid data={listFriend} />,
    },
    {
      key: 'FOLLOWER',
      title: `Follower (${profileUser.totalFollowers})`,
      content: <Grid data={listFriend} />,
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
