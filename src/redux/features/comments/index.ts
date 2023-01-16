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
        let newArr = [...state.listComment];
        const { comments = [] } = payload;

        const find = newArr.filter((x: any) => x.postId === comments[0].id);
        // .sort(
        //   (a: any, b: any) => new Date(a.createdAt) - new Date(b.createdAt)
        // );

        if (find.length) {
          newArr = find.map((x) => {
            return { ...x, data: comments };
          });
        } else {
          newArr = [...newArr, { postId: comments[0].id, data: comments }];
        }
        return {
          ...state,
          isLoading: false,
          listComment: newArr,
        };
      })
      .addCase(getCommentsOfPost.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});

export const { reducer: commentsReducer } = commentSlice;
