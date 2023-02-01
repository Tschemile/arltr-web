import { createSlice } from '@reduxjs/toolkit';

import { getListFriend, makeRelation, updateRelation } from '@/redux/actions';

export interface RelationState {
  listFriend: Record<string, string>[];
  isLoading: Record<
    'loadingMakeRelation' | 'loadingListFriend' | 'loadingBreakUp',
    boolean
  >;
}

// Initial state
const initialState: RelationState = {
  listFriend: [],
  isLoading: {
    loadingMakeRelation: false,
    loadingListFriend: false,
    loadingBreakUp: false,
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
          isLoading: { ...state.isLoading, loadingMakeRelation: true },
        };
      })
      .addCase(makeRelation.fulfilled, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingMakeRelation: false },
        };
      })
      .addCase(makeRelation.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingMakeRelation: false },
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
      })
      .addCase(updateRelation.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingBreakUp: true },
        };
      })
      .addCase(updateRelation.fulfilled, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingBreakUp: false },
        };
      })
      .addCase(updateRelation.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingBreakUp: false },
        };
      });
  },
});

export const { reducer: relationReducer } = relationSlice;
