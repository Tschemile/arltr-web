import { createSlice } from '@reduxjs/toolkit';

import { createNewAlbum, getListAlbums } from '@/redux/actions';

export interface IAlbumState {
  listAlbums: Record<string, string>[];
  isLoading: boolean;
  isUpdated: boolean;
}

// Initial state
const initialState: IAlbumState = {
  listAlbums: [],
  isLoading: false,
  isUpdated: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    createdAlbum: (state, { payload }) => {
      return { ...state, listAlbums: [...state.listAlbums, payload] };
    },
    editedAlbum: (state, { payload }) => {
      const newList = state.listAlbums.map((x) => {
        return x.id === payload.id ? payload : x;
      });
      return { ...state, listAlbums: newList };
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(createNewAlbum.pending, (state) => {
        return { ...state, isUpdated: true };
      })
      .addCase(createNewAlbum.fulfilled, (state) => {
        return {
          ...state,
          isUpdated: false,
        };
      })
      .addCase(createNewAlbum.rejected, (state) => {
        return { ...state, isUpdated: false };
      })
      .addCase(getListAlbums.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(getListAlbums.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false, listAlbums: payload.albums };
      })
      .addCase(getListAlbums.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});

export const { createdAlbum, editedAlbum } = albumsSlice.actions;

export const { reducer: albumsReducer } = albumsSlice;
