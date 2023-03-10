import { createSlice } from '@reduxjs/toolkit';

import { getProfileUser } from '@/redux/actions';

export interface ProfileState {
  profileUser: Record<string, any>;
  loading: boolean;
}

// Initial state
const initialState: ProfileState = {
  profileUser: {},
  loading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, { payload }) => {
      return { ...state, profileUser: payload };
    },
  },
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
      });
  },
});

export const { updateProfile } = profileSlice.actions;

export const { reducer: profileReducer } = profileSlice;
