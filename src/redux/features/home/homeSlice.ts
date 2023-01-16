import { createSlice } from '@reduxjs/toolkit';

export interface IHomeState {
  isShowNavbar: boolean;
}

// Initial state
const initialState: IHomeState = {
  isShowNavbar: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    onShowNavbar: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isShowNavbar = !state.isShowNavbar;
    },
    onHideNavbar: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isShowNavbar = false;
    },
  },
});

export const { onShowNavbar, onHideNavbar } = homeSlice.actions;

export const { reducer: homeReducer } = homeSlice;
