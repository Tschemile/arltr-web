import Image from 'next/image';
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
  const { name = '', total = 0, cover = '', id = '', avatar = '' } = group;
  return (
    <Card
      img={
        cover ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiUvtkIL7TNaP5Md966DKyLLX8Qv-pFOpaQIPZiS-gZpnDgPa19fGVougiaSfftwtCcE&usqp=CAU'
      }
      className="relative text-left transition-all hover:-translate-y-1"
      imgClassName="!min-h-[150px] cursor-pointer"
    >
      <div className="absolute top-1/2 left-1/2 z-10 h-12 w-12 min-w-[48px] -translate-x-1/2 -translate-y-1/2">
        <Image
          src={avatar}
          alt="avatar"
          width={48}
          height={48}
          className="h-full w-full rounded-full"
        />
      </div>
      <h1
        className="mt-2 w-full cursor-pointer text-lg font-bold"
        onClick={() => router.push(`/groups/${id}`)}
      >
        {name}
      </h1>
      <p className="mb-2 text-sm">
        {total} Members <span className="text-base">·</span> 50 posts
      </p>
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
