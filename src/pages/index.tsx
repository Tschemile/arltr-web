import CreatePost from '@/components/CreatePost';
import NewsFeed from '@/components/Home/NewsFeed';
import SideMenu from '@/components/Home/SideMenu';
import StoryCarousels from '@/components/Home/StoryCarousels';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="I ♥ U" description="I ♥ U" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-6 lg:mx-[15%] ">
          <StoryCarousels />
          <div className="mt-2 lg:mx-[5%]">
            <CreatePost />
            <NewsFeed />
          </div>
        </div>
        <SideMenu />
      </div>
    </Main>
  );
};

export default Index;
