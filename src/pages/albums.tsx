import { useState } from 'react';

import Card from '@/components/common/Card';
import Carousels from '@/components/common/Carousels';
import Tooltip from '@/components/common/Tooltip';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Albums = () => {
  const [modal, setModal] = useState(false);
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
      <div onClick={() => setModal(true)}>
        <Tooltip description="hihi">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
          recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
          labore voluptatibus distinctio recusandae autem esse explicabo
          molestias officia placeat, accusamus aut saepe.
        </Tooltip>
      </div>
      {modal && (
        <div className="fixed top-0 left-0 z-10 w-full overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 ">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setModal(false)}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
              &#8203;
            </span>
            <div
              className={`absolute top-1/2 left-1/2 m-0 inline-block w-full -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:align-middle`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              hihi
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Albums;
