import { createSlice } from '@reduxjs/toolkit';

import { uploadMultiFile } from '@/redux/actions';

export interface IUploadState {
  loading: boolean;
}

// Initial state
const initialState: IUploadState = {
  loading: false,
};

export const uploadsSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(uploadMultiFile.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(uploadMultiFile.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(uploadMultiFile.rejected, (state) => {
        return { ...state, loading: false };
      });
  },
});

export const { reducer: uploadsReducer } = uploadsSlice;
