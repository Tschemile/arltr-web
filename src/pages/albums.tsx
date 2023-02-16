import Card from '@/components/common/Card';
import Carousels from '@/components/common/Carousels';
import PreviewPost from '@/components/common/PreviewPost';
import Tooltip from '@/components/common/Tooltip';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Albums = () => {
  return (
    <Main meta={<Meta title="Album" description="Album" />}>
      <p>Phồtố</p>
      <Carousels>
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
            className="mx-1 text-left"
            imgClassName="!min-h-[100px] cursor-pointer"
            onClickImg={() => console.log('first')}
          >
            <h1>Group {index}</h1>
            <p className="text-sm">1 Members 50posts</p>
            <div className="my-1 flex items-center text-sm">
              <div className="mr-1 flex cursor-pointer -space-x-2 overflow-hidden">
                <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
                <span className="m-auto inline-block rounded-full bg-pink-400 p-3 ring-2 ring-white hover:z-10" />
              </div>
              See all Members
            </div>
          </Card>
        ))}
      </Carousels>
      <div>
        <Tooltip description="hihi">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
          recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
          labore voluptatibus distinctio recusandae autem esse explicabo
          molestias officia placeat, accusamus aut saepe.
        </Tooltip>
      </div>

      <PreviewPost>
        <img
          src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
          alt="image"
        />
        <img
          src="https://i.pinimg.com/originals/e7/d9/5c/e7d95c382775ecdb5eca6fa9faa05d3e.jpg"
          alt="image"
        />
        <img
          src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
          alt="image"
          onClick={() => {
            console.log('first');
          }}
        />
        {/* <Image
          src={
            'https://i.pinimg.com/originals/e7/d9/5c/e7d95c382775ecdb5eca6fa9faa05d3e.jpg'
          }
          alt="image"
          width={300}
          height={300}
          objectFit="cover"
        /> */}
      </PreviewPost>
    </Main>
  );
};

export default Albums;
