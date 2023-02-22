import React from 'react';

import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { useAppSelector } from '@/redux/hooks';

import CardGroups from '../Card';

export default function MyGroups() {
  const listMyGroups = useAppSelector((state) => state.groups.listGroups);
  const isLoading = useAppSelector((state) => state.groups.loading);
  const isLoadingCurrentUser = useAppSelector(
    (state) => state.auth.isLoading.loadingCurrentUser
  );
  return (
    <>
      <p className="my-4">My Groups</p>
      {isLoading || isLoadingCurrentUser ? (
        <CardSkeleton total={9} className="md:!grid-cols-3" />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {listMyGroups.map((x) => (
            <CardGroups key={x.id} group={x} />
          ))}
        </div>
      )}
    </>
  );
}
