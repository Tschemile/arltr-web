import React, { useEffect, useState } from 'react';

import TabsContent from '@/components/common/Tabs/TabsContent';
import { getListFriend } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Button from '../../common/Button';
import Card from '../../common/Card';
import Tabs from '../../common/Tabs';

interface TabsProps {
  options?: any[];
  defaultKey?: string;
  handleChange?: (value: string) => void;
}

interface GridProps {
  data: Array<any>;
}

const Grid = (props: GridProps) => {
  const { data = [] } = props;
  return data?.length ? (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data.map((val) => (
          <Card img={val.img} key={val.id}>
            <p>{val.name}</p>
            <p className="mb-1 text-sm">{val.following} Following</p>
            <Button
              type="button"
              className="w-full justify-center bg-[#dbeafe] text-sm text-[#71a7f2]"
            >
              Following
            </Button>
          </Card>
        ))}
      </div>
      <Button className="m-auto mt-4">loading more</Button>
    </>
  ) : (
    <p className="text-center">Poor for you, dont have fen 😢</p>
  );
};

export default function Friends(props: TabsProps) {
  const {} = props;
  const [active, setIsActive] = useState('1');
  const dispatch = useAppDispatch();
  const {
    isLoading: { loadingListFriend },
    listFriend,
  } = useAppSelector((state) => state.relation);
  const recentlyListfriend = (listFriend || []).map((friend) => friend);

  useEffect(() => {
    dispatch(getListFriend({ type: 'FOLLOWING' }));
  }, []);

  const options = [
    {
      key: '1',
      title: 'All Friends 9,999',
      content: <Grid data={listFriend} />,
    },
    {
      key: '2',
      title: 'Recently added',
      content: <Grid data={recentlyListfriend} />,
    },
  ];
  return (
    <Card>
      <p>Friends</p>
      <Tabs
        options={options}
        defaultKey={active}
        handleChange={(key) => setIsActive(key)}
      />
      <TabsContent options={options} active={active} />
    </Card>
  );
}
