import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Divider from '@/components/common/Divider';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Pages = () => {
  return (
    <Main meta={<Meta title="U me ❤️" description="U me ❤️" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 lg:col-span-6 xl:ml-[20%]">
          <p className="mt-4">Suggested Pages</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[...Array(10)].map((_, index) => (
              <Card
                key={index}
                img="https://i.pinimg.com/originals/3f/3d/93/3f3d934ef3b86c349587401f94cf865a.jpg"
                className="text-left transition-all hover:-translate-y-1"
                imgClassName="min-h-[150px] cursor-pointer"
              >
                <h1 className="font-semibold">Page {index}</h1>
                <p className="text-sm">Shopping</p>
                <div className="my-1 flex items-center text-sm">
                  5k people like this
                </div>
                <div className="flex items-stretch">
                  <Button className="ml-1 h-8 w-full justify-center text-sm">
                    Like
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="col-span-2 hidden h-fit p-2 shadow-lg lg:block">
          <h1 className="text-xl">Groups</h1>
          <ul>
            <li className="cursor-pointer py-2 px-3 text-base hover:bg-pink-200">
              Suggested Groups
            </li>
            <li className="cursor-pointer py-2 px-3 text-base hover:bg-pink-200">
              My Groups
            </li>
            <li className="cursor-pointer py-2 px-3 text-base hover:bg-pink-200">
              Joined Groups
            </li>
          </ul>
          <Button className="w-full justify-center bg-blue-200 text-base text-white">
            + Create
          </Button>
          <Divider />
          <div className="flex justify-between text-base">
            Suggested Groups <a>See all</a>
          </div>
          <div className="flex h-16 w-full items-center rounded px-3 py-2 hover:bg-pink-200">
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
            <div
              className="flex h-16 w-full items-center rounded px-3 py-2 hover:bg-pink-200"
              key={index}
            >
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
};

export default Pages;
