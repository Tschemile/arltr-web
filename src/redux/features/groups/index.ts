import { createSlice } from '@reduxjs/toolkit';

import {
  createNewGroups,
  editGroup,
  getGroupsById,
  getListGroups,
} from '@/redux/actions';
import type { IGroups } from '@/redux/actions/Interface';

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
      return { ...state, currentGroup: { ...state.currentGroup, ...payload } };
    },
    hasCreatedNewGroup: (state, { payload }) => {
      return { ...state, listGroups: [...state.listGroups, payload] };
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
      .addCase(editGroup.pending, (state) => {
        return { ...state, isUpdated: true };
      })
      .addCase(editGroup.fulfilled, (state) => {
        return { ...state, isUpdated: false };
      })
      .addCase(editGroup.rejected, (state) => {
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

export const { hasEdited, hasCreatedNewGroup } = groupsSlice.actions;

export const { reducer: groupsReducer } = groupsSlice;
