import { createSlice } from '@reduxjs/toolkit';

import { createNewGroups, getGroupsById, getListGroups } from '@/redux/actions';
import type { IGroups } from '@/redux/actions/Interface';

// import { getCommentsOfPost } from '@/redux/actions';

export interface IListGroups {
  listGroups: Record<string, string>[];
  loading: boolean;
  isUpdated: boolean;
  isLoadingDetail: boolean;
  currentGroup: IGroups;
}

// Initial state
const initialState: IListGroups = {
  listGroups: [],
  loading: false,
  isUpdated: false,
  isLoadingDetail: false,
  currentGroup: {},
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    hasEdited: (state, { payload }) => {
      return { ...state, currentGroup: payload };
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(getListGroups.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getListGroups.fulfilled, (state, { payload }) => {
        return { ...state, loading: false, listGroups: payload.groups };
      })
      .addCase(getListGroups.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(createNewGroups.pending, (state) => {
        return { ...state, isUpdated: true };
      })
      .addCase(createNewGroups.fulfilled, (state) => {
        return { ...state, isUpdated: false };
      })
      .addCase(createNewGroups.rejected, (state) => {
        return { ...state, isUpdated: false };
      })
      .addCase(getGroupsById.pending, (state) => {
        return { ...state, isLoadingDetail: true };
      })
      .addCase(getGroupsById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoadingDetail: false,
          currentGroup: payload.group,
        };
      })
      .addCase(getGroupsById.rejected, (state) => {
        return { ...state, isLoadingDetail: false };
      });
  },
});

export const { hasEdited } = groupsSlice.actions;

export const { reducer: groupsReducer } = groupsSlice;
