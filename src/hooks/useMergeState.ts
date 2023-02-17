import { useCallback, useState } from 'react';

export const useMergeState = <T>(
  initialState: T
): [T, (newState: Partial<T>) => void] => {
  const [state, setState] = useState(initialState);
  const setMergedState = useCallback(
    (newState: Partial<T>) =>
      setState((prevState) => ({
        ...prevState,
        ...newState,
      })),
    [setState]
  );
  return [state, setMergedState];
};
