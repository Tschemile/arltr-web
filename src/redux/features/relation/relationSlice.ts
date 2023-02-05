import { createSlice } from '@reduxjs/toolkit';

import { changeRelation, getListRelation } from '@/redux/actions';

export interface RelationState {
  listRelation: Record<string, string>[];
  isLoading: Record<'loadingChangeRelation' | 'loadingListRelation', boolean>;
}

// Initial state
const initialState: RelationState = {
  listRelation: [],
  isLoading: {
    loadingChangeRelation: false,
    loadingListRelation: false,
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
      });
  },
});

export const { reducer: relationReducer } = relationSlice;
