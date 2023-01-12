import { createSlice } from '@reduxjs/toolkit';

import { getProfileUser, getReletionCount } from '@/redux/actions';

export interface ProfileState {
  profileUser: Record<string, string>;
  loading: boolean;
  totalRelation: Record<string, number>;
}

// Initial state
const initialState: ProfileState = {
  profileUser: {},
  loading: false,
  totalRelation: {},
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
      .addCase(getReletionCount.fulfilled, (state, { payload }) => {
        return { ...state, totalRelation: payload.total };
      });
  },
});

export const { reducer: profileReducer } = profileSlice;
