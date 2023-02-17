import { useCallback, useEffect, useRef, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  const debouncedValue = useDebounce(callback, 500);

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0] || {};
        if (isIntersecting && debouncedValue) {
          setIsFetching(true);
          debouncedValue();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, debouncedValue]
  );

  useEffect(() => {
    setIsFetching(false);
  }, [isFetching]);

  return [isFetching, lastElementRef];
};

export default useInfiniteScroll;
