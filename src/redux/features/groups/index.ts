import { createSlice } from '@reduxjs/toolkit';

import { getListGroups } from '@/redux/actions';

// import { getCommentsOfPost } from '@/redux/actions';

export interface IListGroups {
  listGroups: Record<string, string>[];
  loading: boolean;
}

// Initial state
const initialState: IListGroups = {
  listGroups: [],
  loading: false,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getListGroups.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getListGroups.fulfilled, (state, { payload }) => {
        return { ...state, loading: false, listGroups: payload.groups };
      });
  },
});

export const { reducer: groupsReducer } = groupsSlice;
