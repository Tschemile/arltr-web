import React from 'react';

import { useAppSelector } from '@/redux/hooks';

import CardGroups from '../Card';

export default function MyGroups() {
  const listMyGroups = useAppSelector((state) => state.groups.listGroups);
  return (
    <>
      <p className="my-4">My Groups</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {listMyGroups.map((x) => (
          <CardGroups key={x.id} group={x} />
        ))}
      </div>
    </>
  );
}
