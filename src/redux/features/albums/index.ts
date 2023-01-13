import { createSlice } from '@reduxjs/toolkit';

import { makeRelation } from '@/redux/actions';

export interface AlbumsState {
  listFriend: Record<string, string>;
  isLoading: Record<'loadingMakeRelation' | 'loadingListFirend', boolean>;
}

// Initial state
const initialState: AlbumsState = {
  listFriend: {},
  isLoading: {
    loadingMakeRelation: false,
    loadingListFirend: false,
  },
};

export const albumsSlice = createSlice({
  name: 'albums',
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

export const { reducer: albumsReducer } = albumsSlice;
