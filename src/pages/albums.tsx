import { useState } from 'react';

import Tabs from '@/components/common/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import { ContentAlbums } from '@/components/Profile/Photos/ContentAlbums';
import { ContentPhotos } from '@/components/Profile/Photos/ContentPhotos';
import { Meta } from '@/layouts/Meta';
import { useAppSelector } from '@/redux/hooks';
import { Main } from '@/templates/Main';

const Albums = () => {
  const [activeTab, setActiveTab] = useState('PHOTOS');

  const { albums = [] } = useAppSelector((state) => state.auth.currentUser);

  const options = [
    {
      key: 'ALBUMS',
      title: 'Albums',
      content: <ContentAlbums />,
    },
    {
      key: 'PHOTOS',
      title: 'Photos',
      content: (
        <ContentPhotos
          data={albums}
          className="!mx-auto !w-fit !grid-cols-3 !p-0 lg:gap-5"
          childClassName="!max-h-[calc(33.33vw-1rem)] !h-[calc(33.33vw-1rem)] !max-w-[calc(33.33vw-1rem)] !w-[calc(33.33vw-1rem)] lg:!max-h-[290px] lg:!max-w-[290px]"
        />
      ),
    },
  ];
  return (
    <Main meta={<Meta title="Album" description="Album" />}>
      <p>Phồtố</p>
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
    </Main>
  );
};

export default Albums;
