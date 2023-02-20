import React, { useState } from 'react';

import Card from '@/components/common/Card';
import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import { useAppSelector } from '@/redux/hooks';

import { ContentAlbums } from './ContentAlbums';
import { ContentPhotots } from './ContentPhotos';

export default function Photos() {
  const [activeTab, setActiveTab] = useState('PHOTOS');

  const { albums = [] } = useAppSelector((state) => state.profile.profileUser);

  const options = [
    {
      key: 'ALBUMS',
      title: 'Albums',
      content: <ContentAlbums />,
    },
    {
      key: 'PHOTOS',
      title: 'Photos',
      content: <ContentPhotots data={albums} />,
    },
  ];

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
