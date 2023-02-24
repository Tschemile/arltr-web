import { createSlice } from '@reduxjs/toolkit';

import { editProfile, getProfileUser } from '@/redux/actions';

export interface ProfileState {
  profileUser: Record<string, any>;
  loading: boolean;
  isUpdated: boolean;
}

// Initial state
const initialState: ProfileState = {
  profileUser: {},
  loading: false,
  isUpdated: false,
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
      })
      .addCase(editProfile.pending, (state) => {
        return { ...state, isUpdated: true };
      })
      .addCase(editProfile.fulfilled, (state) => {
        return { ...state, isUpdated: false };
      })
      .addCase(editProfile.rejected, (state) => {
        return { ...state, isUpdated: false };
      });
  },
});

export const { updateProfile } = profileSlice.actions;

export const { reducer: profileReducer } = profileSlice;
