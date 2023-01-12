import { createSlice } from '@reduxjs/toolkit';

import { makeRelation } from '@/redux/actions';

export interface RelationState {
  listFriend: Record<string, string>;
  isLoading: Record<'loadingMakeRelation' | 'loadingListFirend', boolean>;
}

// Initial state
const initialState: RelationState = {
  listFriend: {},
  isLoading: {
    loadingMakeRelation: false,
    loadingListFirend: false,
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
      });
  },
});

export const { reducer: profileReducer } = relationSlice;
