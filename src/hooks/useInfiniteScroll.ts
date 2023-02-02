import axios from 'axios';
import { useCallback, useRef, useState } from 'react';

import type { IUseInfiniteScroll } from '.';

export const useInfiniteScroll = (posts: any[]): IUseInfiniteScroll => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasDynamicPosts, setHasDynamicPosts] = useState(false);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>(posts);
  const [isLastPage, setIsLastPage] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setIsLoading(true);
        clearTimeout(loadMoreTimeoutRef.current);

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          axios.get(`/api/posts/${page}`).then((resp) => {
            setPage(page + 1);
            const newPosts = resp?.data.posts;

            if (newPosts?.length) {
              const newDynamicPosts = [...dynamicPosts, ...newPosts];
              setDynamicPosts(newDynamicPosts);
              setIsLastPage(newDynamicPosts?.length === resp?.data.total);
              setHasDynamicPosts(true);
              setIsLoading(false);
            }
          });
        }, 500);
      }
    },
    [loadMoreTimeoutRef, setIsLoading, page, dynamicPosts]
  );

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      };
      observerRef.current = new IntersectionObserver(handleObserver, option);

      if (el) observerRef.current.observe(el);
    },
    [handleObserver, isLoading]
  );

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
  };
};
