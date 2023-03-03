import React, { useEffect, useState } from 'react';

import CardPost from '@/components/CardPost';
import Carousels from '@/components/common/Carousels';
import Divider from '@/components/common/Divider';
import Input from '@/components/common/Input';
import CardPostSkeleton from '@/components/Skeleton/CardPost';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { GROUPS } from '@/constants/enum';
import useDebounce from '@/hooks/useDebounce';
import { getListGroups, getProfileListPosts } from '@/redux/actions';
import { clearListPosts } from '@/redux/features/posts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import CardGroups from '../Card';

export default function MyGroups() {
  const dispatch = useAppDispatch();
  const { id: userId = '' } = useAppSelector((state) => state.auth.currentUser);
  const listMyGroups = useAppSelector((state) => state.groups.listGroups);
  const isLoading = useAppSelector((state) => state.groups.loading);
  const isLoadingCurrentUser = useAppSelector(
    (state) => state.auth.isLoading.loadingCurrentUser
  );
  const listPostsProps = useAppSelector((state) => state.posts.listPosts);
  const listComments = useAppSelector((state) => state.comments.listComment);
  const isLoadingListPost = useAppSelector((state) => state.posts.loadingPosts);
  const firstGroupId = listMyGroups.length > 0 && listMyGroups[0]?.id;

  const [searchKey, setSearchKey] = useState('');
  const debounceValue = useDebounce(searchKey, 700);
  const [groupsId, setGroupId] = useState('');
  const [listPosts, setListPosts] = useState([]);
  useEffect(() => {
    if (userId)
      dispatch(
        getListGroups({
          type: GROUPS.TYPE.USER,
          limit: 9,
          user: userId,
          search: debounceValue,
        })
      );
  }, [userId, debounceValue]);

  useEffect(() => {
    if (listPostsProps) setListPosts(listPostsProps as []);
  }, [JSON.stringify(listPostsProps)]);

  useEffect(() => {
    return () => {
      dispatch(clearListPosts());
    };
  }, []);

  useEffect(() => {
    if (groupsId) {
      dispatch(
        getProfileListPosts({
          type: 'POST',
          queryType: 'GROUP',
          limit: 10,
          group: groupsId,
        })
      );
    }
  }, [groupsId]);

  useEffect(() => {
    if (firstGroupId) setGroupId(firstGroupId);
  }, [firstGroupId]);

  return (
    <>
      <div className="my-4 flex items-center justify-between ">
        <h1>My Groups</h1>
        <Input
          inpulClassName="!bg-secondary-color text-base !rounded-full !w-[300px]"
          placeholder="Search here..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      {isLoading || isLoadingCurrentUser ? (
        <CardSkeleton total={8} />
      ) : (
        <Carousels numSlide={4} childClassName="!w-1/2 md:!w-1/3 lg:!w-1/4">
          {listMyGroups.map((x) => (
            <div key={x.id} onClick={() => setGroupId(String(x.id))}>
              <CardGroups group={x} />
            </div>
          ))}
        </Carousels>
      )}
      <Divider />
      <div className="my-4">
        <h1>Recently Activities</h1>
        <div className="my-2 h-full gap-2 sm:columns-2">
          {(isLoading && !searchKey) ||
          isLoadingCurrentUser ||
          isLoadingListPost ? (
            <CardPostSkeleton total={4} />
          ) : (
            <>
              {listPosts.length > 0 ? (
                (listPosts as Record<string, string>[]).map((x, index) => (
                  <div key={x.id} className="h-full w-full break-inside-avoid">
                    <CardPost
                      post={x}
                      listComments={listComments}
                      listPosts={listPosts}
                      isFirstPost={index === 0}
                    />
                  </div>
                ))
              ) : (
                <p>This group has no posts yet</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
