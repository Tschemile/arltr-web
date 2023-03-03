import { createSlice } from "@reduxjs/toolkit";

import {
  createPost,
  editPost,
  getListReaction,
  getProfileListPosts,
} from "@/redux/actions";

export interface ProfileState {
  totalRelation: Record<string, number>;
  listPosts: Record<string, string>[];
  loadingPosts: boolean;
  listReaction: Record<"users" | "total" | string, any | undefined[]>;
  isUpdatePost: boolean;
  loadingListRelations: boolean;
}

// Initial state
const initialState: ProfileState = {
  totalRelation: {},
  listPosts: [],
  loadingPosts: false,
  listReaction: {},
  isUpdatePost: false,
  loadingListRelations: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearListPosts: (state) => {
      return { ...state, listPosts: [] };
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(getProfileListPosts.pending, (state) => {
        return { ...state, loadingPosts: true };
      })
      .addCase(getProfileListPosts.fulfilled, (state, { payload }) => {
        return { ...state, loadingPosts: false, listPosts: payload.posts };
      })
      .addCase(getProfileListPosts.rejected, (state) => {
        return { ...state, loadingPosts: false };
      })
      .addCase(getListReaction.pending, (state) => {
        return { ...state, loadingListRelations: true };
      })
      .addCase(getListReaction.rejected, (state) => {
        return { ...state, loadingListRelations: false };
      })
      .addCase(getListReaction.fulfilled, (state, { payload }) => {
        return {
          ...state,
          listReaction: payload.data,
          loadingListRelations: false,
        };
      })
      .addCase(createPost.pending, (state) => {
        return { ...state, isUpdatePost: true };
      })
      .addCase(createPost.rejected, (state) => {
        return { ...state, isUpdatePost: false };
      })
      .addCase(createPost.fulfilled, (state) => {
        return {
          ...state,
          isUpdatePost: false,
        };
      })
      .addCase(editPost.pending, (state) => {
        return { ...state, isUpdatePost: true };
      })
      .addCase(editPost.rejected, (state) => {
        return { ...state, isUpdatePost: false };
      })
      .addCase(editPost.fulfilled, (state) => {
        return {
          ...state,
          isUpdatePost: false,
        };
      });
  },
});
export const { clearListPosts } = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;
