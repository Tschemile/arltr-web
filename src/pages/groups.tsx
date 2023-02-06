import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Carousels from '@/components/common/Carousels';
import Divider from '@/components/common/Divider';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = () => (
  <Main meta={<Meta title="Fall in luv ❤️" description="Fall in luv ❤️" />}>
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-6 xl:ml-[20%]">
        <p className="my-4">Popular Groups</p>
        <Carousels numSlide={3}>
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
              className="mx-1 text-left"
              imgClassName="!min-h-[100px] cursor-pointer"
            >
              <h1>Group {index}</h1>
              <p className="text-sm">1 Members 50posts</p>
              <p className="text-sm">See all Members</p>
              <div className="flex justify-between">
                <Button className="mr-1 h-8 w-full justify-center text-sm">
                  Join
                </Button>
                <Button
                  background="secondary"
                  className="ml-1 h-8 w-full justify-center text-sm"
                >
                  View
                </Button>
              </div>
            </Card>
          ))}
        </Carousels>
        <p className="mt-4">Categories</p>
        <p className="mb-4 text-sm">Find A Group By Browsing Top Categories</p>
        <Carousels numSlide={4}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="relative m-1 min-h-[120px] overflow-hidden rounded-lg shadow-lg hover:-translate-y-1"
            >
              <img
                src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
                className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover`}
                alt="image"
              />
              <p className="absolute left-2 bottom-1 text-white">Animals</p>
            </div>
          ))}
        </Carousels>
        <p className="mt-4">Suggested Groups</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              img="https://i.pinimg.com/originals/ad/39/ea/ad39ea262d0bd449e8a855c5c63bf2cc.jpg"
              className="mr-3 text-left"
              imgClassName="!min-h-[100px] cursor-pointer"
            >
              <h1>Group {index}</h1>
              <p className="text-sm">1 Members 50posts</p>
              <p className="text-sm">See all Members</p>
              <div className="flex justify-between">
                <Button className="mr-1 h-8 w-full justify-center text-sm">
                  Join
                </Button>
                <Button
                  background="secondary"
                  className="ml-1 h-8 w-full justify-center text-sm"
                >
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="col-span-2 h-fit p-2 shadow-lg">
        <h1 className="text-xl">Groups</h1>
        <ul>
          <li className="cursor-pointer py-2 px-3 text-base">
            Suggested Groups
          </li>
          <li className="cursor-pointer py-2 px-3 text-base">My Groups</li>
          <li className="cursor-pointer py-2 px-3 text-base">Joined Groups</li>
        </ul>
        <Button className="w-full justify-center bg-blue-200 text-base text-blue-700">
          + Create
        </Button>
        <Divider />
        <div className="flex justify-between text-base">
          Suggested Groups <a>See all</a>
        </div>
        <div className="flex h-9 w-full items-center px-3 py-2">
          <div className="relative mr-2 min-h-full w-1/4 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://i.pinimg.com/originals/34/72/b4/3472b42c7167bb8bea4ff833e83708fa.jpg"
              className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover`}
              alt="image"
            />
          </div>
          <div>
            <p className="text-base">Rabbit</p>
            <p className="text-sm">Animals</p>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between text-base">My Groups</div>
        {[...Array(3)].map((_, index) => (
          <div className="flex h-9 w-full items-center px-3 py-2" key={index}>
            <div className="relative mr-2 min-h-full w-1/4 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://i.pinimg.com/originals/34/72/b4/3472b42c7167bb8bea4ff833e83708fa.jpg"
                className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover`}
                alt="image"
              />
            </div>
            <div>
              <p className="text-base">Rabbit</p>
              <p className="text-sm">Animals</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Main>
);

export default Blog;
