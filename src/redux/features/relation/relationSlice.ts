import { createSlice } from '@reduxjs/toolkit';

import { getListFriend, makeRelation } from '@/redux/actions';

export interface RelationState {
  listFriend: Record<string, string>;
  isLoading: Record<'loadingMakeRelation' | 'loadingListFriend', boolean>;
}

// Initial state
const initialState: RelationState = {
  listFriend: {},
  isLoading: {
    loadingMakeRelation: false,
    loadingListFriend: false,
  },
};

export const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(makeRelation.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingRegister: true },
        };
      })
      .addCase(makeRelation.fulfilled, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingRegister: false },
        };
      })
      .addCase(makeRelation.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingRegister: false },
        };
      })
      .addCase(getListFriend.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingListFriend: true },
        };
      })
      .addCase(getListFriend.fulfilled, (state) => {
        return {
          ...state,
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

export const { reducer: profileReducer } = relationSlice;
