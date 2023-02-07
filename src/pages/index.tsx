import CardPost from '@/components/CardPost';
import CreatePost from '@/components/CreatePost';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="I ♥ U" description="I ♥ U" />}>
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="md:col-span-2">
          <CreatePost />
          <CardPost />
        </div>
      </div>
    </Main>
  );
};

export default Index;
