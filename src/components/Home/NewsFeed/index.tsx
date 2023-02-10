import React, { useEffect, useState } from 'react';

import CardPost from '@/components/CardPost';
import CardPostSkeleton from '@/components/Skeleton/CardPost';
import { getProfileListPosts } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

function NewsFeed() {
  const dispatch = useAppDispatch();

  const { id: profileId = '' } = useAppSelector(
    (state) => state.auth.currentUser
  );
  const listPostsProps = useAppSelector((state) => state.posts.listPosts);
  const loadingPosts = useAppSelector((state) => state.posts.loadingPosts);
  const loadingCurrentUser = useAppSelector(
    (state) => state.auth.isLoading.loadingCurrentUser
  );
  const listComments = useAppSelector((state) => state.comments.listComment);

  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    setListPosts(listPostsProps as []);
  }, [JSON.stringify(listPostsProps)]);

  useEffect(() => {
    if (profileId)
      dispatch(
        getProfileListPosts({
          type: 'POST',
          queryType: 'COMMUNITY',
          limit: 10,
        })
      );
  }, [profileId]);
  return (
    <>
      {loadingPosts || loadingCurrentUser ? (
        <CardPostSkeleton />
      ) : (
        (listPosts as Record<string, string>[]).map((x) => (
          <CardPost
            post={x}
            key={x.id}
            listComments={listComments}
            setListPosts={setListPosts}
            listPosts={listPosts}
            isPersonPage={false}
          />
        ))
      )}
      {}
    </>
  );
}

export default NewsFeed;
