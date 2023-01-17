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
          <CardPost img="https://cdn.lazi.vn/timthumb.php?src=storage/uploads/users/avatar/1502200931_maxresdefault.jpg&w=300&h=300">
            Conan Kun
          </CardPost>
          <CardPost img="https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/review/phim/anime-naruto.jpg">
            How are you bro?
          </CardPost>
          <CardPost>Hehe</CardPost>
        </div>
      </div>
    </Main>
  );
};

export default Index;
