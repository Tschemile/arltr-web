import { createSlice } from '@reduxjs/toolkit';

import { changeRelation, getListFriend } from '@/redux/actions';

export interface RelationState {
  listFriend: Record<string, string>[];
  isLoading: Record<'loadingChangeRelation' | 'loadingListFriend', boolean>;
}

// Initial state
const initialState: RelationState = {
  listFriend: [],
  isLoading: {
    loadingChangeRelation: false,
    loadingListFriend: false,
  },
};

export const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(changeRelation.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingChangeRelation: true },
        };
      })
      .addCase(changeRelation.fulfilled, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingChangeRelation: false },
        };
      })
      .addCase(changeRelation.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingChangeRelation: false },
        };
      })
      .addCase(getListFriend.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingListFriend: true },
        };
      })
      .addCase(getListFriend.fulfilled, (state, action) => {
        return {
          ...state,
          listFriend: action.payload.relations,
          isLoading: { ...state.isLoading, loadingListFriend: false },
        };
      })
      .addCase(getListFriend.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingListFriend: false },
        };
      });
  },
});

export const { reducer: relationReducer } = relationSlice;
