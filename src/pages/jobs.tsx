import React from 'react';

import Card from '@/components/common/Card';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function Jobs() {
  return (
    <Main meta={<Meta title="baboom ❤️" description="baboom ❤️" />}>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 lg:col-span-6 xl:ml-[20%]">
          <p className="mt-4">Browse Jobs</p>
          <div className="mt-4 grid grid-cols-2 gap-2 ">
            {[...Array(10)].map((_, index) => (
              <Card
                key={index}
                img="https://i.pinimg.com/originals/5d/1b/46/5d1b462d6936ce51d51c615c53126a53.png"
                className="relative text-left transition-all hover:-translate-y-1"
                imgClassName="!min-h-[140px] cursor-pointer"
              >
                <h1 className="font-semibold">Ai Ti {index}</h1>
                <p className="text-sm font-light">Technical</p>
                <div className="mt-2 h-11 w-full overflow-hidden text-ellipsis text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
                  saepe earum perferendis ipsa reprehenderit eaque nihil
                  corporis fugit, nostrum porro culpa illo laborum delectus
                  accusamus vel a est sequi? Dolorum. Id voluptatum quaerat,
                  voluptate, veniam voluptatibus dolor repudiandae deserunt
                  architecto fugit corrupti, commodi eum! Earum exercitationem
                  corrupti facere blanditiis, voluptatibus debitis sint ipsa
                  expedita et incidunt dolore hic officia id. Mollitia dolorum
                  corporis ipsa beatae et id alias dicta inventore accusantium
                  praesentium. Reiciendis animi doloribus nobis est maiores
                  itaque maxime pariatur sed velit libero ducimus ex, et cumque,
                  exercitationem fugit.
                </div>
                <div className="flex space-x-1 text-sm text-rose-600">
                  <div className="rounded bg-purple-300 px-1">US</div>
                  <div className="rounded bg-purple-300 px-1">1 Day Ago</div>
                  <div className="rounded bg-purple-300 px-1">
                    Part time - only night
                  </div>
                </div>
                <div className="absolute right-1 top-[125px] justify-between rounded-full bg-pink-100 px-2 text-base text-blue-400 shadow-lg">
                  $3000 - $500
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="col-span-2 hidden h-fit p-2 shadow-lg lg:block">
          <h1 className="text-xl">Jobs</h1>
          <input
            placeholder="Search for jobs"
            className="w-full rounded bg-slate-300 p-2 text-sm outline-none placeholder:text-sm placeholder:text-gray-600"
          />
          <div className="my-1 text-base font-semibold hover:bg-pink-100">
            Nearby Business
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Jobs;
