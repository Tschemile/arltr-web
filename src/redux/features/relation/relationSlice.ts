import { createSlice } from '@reduxjs/toolkit';

import {
  changeRelation,
  getListRelation,
  setFriendship,
} from '@/redux/actions';

export interface RelationState {
  listRelation: Record<string, string>[];
  isLoading: Record<
    'loadingChangeRelation' | 'loadingListRelation' | 'loadingFriend',
    boolean
  >;
}

// Initial state
const initialState: RelationState = {
  listRelation: [],
  isLoading: {
    loadingChangeRelation: false,
    loadingListRelation: false,
    loadingFriend: false,
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
      .addCase(getListRelation.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingListRelation: true },
        };
      })
      .addCase(getListRelation.fulfilled, (state, action) => {
        return {
          ...state,
          listRelation: action.payload.relations,
          isLoading: { ...state.isLoading, loadingListRelation: false },
        };
      })
      .addCase(getListRelation.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingListRelation: false },
        };
      })
      .addCase(setFriendship.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingFriend: true },
        };
      })
      .addCase(setFriendship.fulfilled, (state, action) => {
        return {
          ...state,
          listRelation: action.payload.relations,
          isLoading: { ...state.isLoading, loadingFriend: false },
        };
      })
      .addCase(setFriendship.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingFriend: false },
        };
      });
  },
});

export const { reducer: relationReducer } = relationSlice;
