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

  useEffect(() => {
    dispatch(getListFriend({ type: 'FOLLOWING' }));
  }, []);

  const fen2 = [
    {
      id: 1,
      name: 'Fen',
      following: '100K',
      img: 'https://globalcastingresources.com/wp-content/uploads/2022/10/1664482232_How-much-does-the-anime-streaming-service-cost.jpg',
    },
    {
      id: 2,
      name: 'Fan',
      following: '100K',
      img: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA16eAHq.img?w=800&h=415&q=60&m=2&f=jpg',
    },
    {
      id: 3,
      name: 'Fung',
      following: '100K',
      img: 'https://thuthuatnhanh.com/wp-content/uploads/2019/07/anh-girl-xinh-facebook-tuyet-dep-387x580.jpg',
    },
    {
      id: 4,
      name: 'Fin',
      following: '100K',
      img: 'https://photo-cms-kienthuc.epicdn.me/zoom/800/uploaded/thutrang/2020_11_24/2/dang-chuan-mat-dep-gai-xinh-ha-thanh-khien-dan-tinh-xao-xuyen.jpg',
    },
    {
      id: 5,
      name: 'Fon',
      following: '100K',
      img: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2021/8/26/photo-1-16299140636611036587762.jpg',
    },
    {
      id: 6,
      name: 'Fên',
      following: '100K',
      img: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA16eJyI.img?w=800&h=415&q=60&m=2&f=jpg',
    },
    {
      id: 7,
      name: 'Fjn',
      following: '100K',
      img: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg',
    },
  ];
  const fen3: any[] = [];

  const options = [
    {
      key: '1',
      title: 'All Friends 9,999',
      content: <Grid data={listFriend} />,
    },
    {
      key: '2',
      title: 'Recently added',
      content: <Grid data={fen2} />,
    },
    {
      key: '3',
      title: 'Family',
      content: <Grid data={fen3} />,
    },
    {
      key: '4',
      title: 'University',
      content: <Grid data={fen3} />,
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
