import CardPost from '@/components/CardPost';
import CreatePost from '@/components/CreatePost';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="I ♥ U" description="I ♥ U" />}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 xl:mx-[20%]">
          <CreatePost />
          <CardPost />
        </div>
      </div>
    </Main>
  );
};

export default Index;
