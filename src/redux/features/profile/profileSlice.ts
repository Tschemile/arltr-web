import { createSlice } from '@reduxjs/toolkit';

import { getProfileListPosts, getProfileUser } from '@/redux/actions';

export interface ProfileState {
  profileUser: Record<string, any>;
  loading: boolean;
  totalRelation: Record<string, number>;
  listPosts: Record<string, string>[];
  loadingPosts: boolean;
}

// Initial state
const initialState: ProfileState = {
  profileUser: {},
  loading: false,
  totalRelation: {},
  listPosts: [],
  loadingPosts: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getProfileUser.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getProfileUser.fulfilled, (state, { payload }) => {
        return { ...state, loading: false, profileUser: payload.profile };
      })
      .addCase(getProfileUser.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(getProfileListPosts.pending, (state) => {
        return { ...state, loadingPosts: true };
      })
      .addCase(getProfileListPosts.fulfilled, (state, { payload }) => {
        return { ...state, loadingPosts: false, listPosts: payload.posts };
      })
      .addCase(getProfileListPosts.rejected, (state) => {
        return { ...state, loadingPosts: false };
      });
  },
});

export const { reducer: profileReducer } = profileSlice;
