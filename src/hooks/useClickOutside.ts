import { useEffect, useRef } from 'react';

export default function useClickOutside(callback: () => void) {
  const innerRef = useRef<any>();
  const callbackRef = useRef<any>(null);

  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    // read most recent callback and innerRef dom node from refs
    function handleClick(e: Event) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current?.contains(e.target)
      ) {
        callbackRef?.current(e);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
}
