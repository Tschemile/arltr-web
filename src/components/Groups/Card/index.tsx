import router from 'next/router';
import React from 'react';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import type { IGroups } from '@/redux/actions/Interface';

interface ICardGroups {
  group: IGroups;
}

export default function CardGroups(props: ICardGroups) {
  const { group = {} } = props;
  const { name = '', total = 0, cover = '', id = '' } = group;
  return (
    <Card
      img={
        cover ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiUvtkIL7TNaP5Md966DKyLLX8Qv-pFOpaQIPZiS-gZpnDgPa19fGVougiaSfftwtCcE&usqp=CAU'
      }
      className="text-left hover:-translate-y-1"
      imgClassName="!min-h-[150px] cursor-pointer"
    >
      <h1
        className="w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold"
        onClick={() => router.push(`/groups/${id}`)}
      >
        {name}
      </h1>
      <p className="mb-2 text-sm">{total} Members 50 posts</p>
      <div className="flex justify-between">
        <Button
          className="mr-1 h-8 w-full justify-center text-sm"
          onSubmit={() => router.push(`/groups/${id}`)}
        >
          View
        </Button>
      </div>
    </Card>
  );
}
