import { createSlice } from '@reduxjs/toolkit';

import { getCommentsOfPost } from '@/redux/actions';

export interface AlbumsState {
  listComment: any[];
  isLoading: boolean;
}

// Initial state
const initialState: AlbumsState = {
  listComment: [],
  isLoading: false,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getCommentsOfPost.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(getCommentsOfPost.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          listComment: [...state.listComment, payload.comments],
        };
      })
      .addCase(getCommentsOfPost.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});

export const { reducer: commentsReducer } = commentSlice;
