import router from 'next/router';
import React, { useEffect, useState } from 'react';

import Card from '@/components/common/Card';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import { getListGroups } from '@/redux/actions';
import type { IGetGroups } from '@/redux/actions/Interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getFirstLetter } from '@/utils/func';

interface IContentGroups {
  data: Record<string, string>[];
}

const ContentGroups = (props: IContentGroups) => {
  const { data = [] } = props;
  if (data.length <= 0)
    return (
      <p className="text-center">Don&lsquo;t have any group here!! 😄😄😄 </p>
    );

  return (
    <>
      <div className="block px-4 py-6 md:grid md:grid-cols-2 md:gap-8">
        {data.map((x) => (
          <div key={x.id} className="mb-4 md:col-span-1">
            <div className="flex w-full items-center">
              <div
                className="h-[60px] w-[60px] cursor-pointer"
                onClick={() => router.push(`/groups/${x.id}`)}
              >
                {x.avatar ? (
                  <img
                    className="h-[60px] w-[60px] rounded-md object-fill"
                    src={x.avatar}
                    alt="avatar-groups"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-pink-400 text-white">
                    {getFirstLetter(x.name as string)}
                  </div>
                )}
              </div>
              <div className="ml-4 overflow-hidden text-base">
                <h3
                  className="max-w-[150px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-[300px] md:max-w-[500px]"
                  onClick={() => router.push(`/groups/${x.id}`)}
                >
                  <strong>{x.name}</strong>
                </h3>
                <p>
                  {x.total} member {Number(x.total) > 1 && 's'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default function Groups() {
  const dispatch = useAppDispatch();

  const listGroups = useAppSelector((state) => state.groups.listGroups);
  const { id = '' } = useAppSelector((state) => state.profile.profileUser);
  const [activeTab, setActiveTab] = useState('PUBLIC');

  const options = [
    {
      key: 'PUBLIC',
      title: 'Public',
      content: <ContentGroups data={listGroups} />,
    },
    {
      key: 'PRIVATE',
      title: 'Private',
      content: <ContentGroups data={listGroups} />,
    },
    {
      key: 'HIDDEN',
      title: 'Hidden',
      content: <ContentGroups data={listGroups} />,
    },
  ];

  useEffect(() => {
    dispatch(
      getListGroups({ mode: activeTab, user: id, type: 'USER' } as IGetGroups)
    );
  }, [activeTab]);

  return (
    <Card>
      <Tabs
        options={options}
        defaultKey={activeTab}
        handleChange={(key) => setActiveTab(key)}
        className="no-scrollbar overflow-y-scroll whitespace-nowrap"
      />
      <TabsContent
        options={options}
        active={activeTab}
        className="min-h-[40vh]"
      />
    </Card>
  );
}
