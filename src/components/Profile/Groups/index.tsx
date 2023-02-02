import React, { useEffect, useState } from 'react';

import Card from '@/components/common/Card';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import { getListGroups } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

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
      <div className="grid grid-cols-2 gap-8 px-4 py-6">
        {data.map((x) => (
          <div key={x.id} className="col-span-1">
            <div className="flex items-center">
              <div className="h-[60px] w-[60px]">
                <img
                  className="h-[60px] w-[60px] rounded-md object-fill"
                  src={x.avatar}
                  alt=""
                />
              </div>
              <div className="ml-4 overflow-hidden text-base">
                <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
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
    dispatch(getListGroups({ mode: activeTab, user: id, type: 'USER' }));
  }, [activeTab]);

  return (
    <Card>
      <Tabs
        options={options}
        defaultKey={activeTab}
        handleChange={(key) => setActiveTab(key)}
      />
      <TabsContent
        options={options}
        active={activeTab}
        className="min-h-[40vh]"
      />
    </Card>
  );
}
