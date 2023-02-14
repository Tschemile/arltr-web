import { createSlice } from '@reduxjs/toolkit';

import { getCurrentUser, login, register } from '@/redux/actions';

// Type for our state
export interface AuthState {
  isLoading: Record<
    'loadingRegister' | 'loadingLogin' | 'loadingCurrentUser',
    boolean
  >;
  emailRegister: string;
  currentUser: Record<string, any>;
}

// Initial state
const initialState: AuthState = {
  isLoading: {
    loadingRegister: false,
    loadingLogin: false,
    loadingCurrentUser: false,
  },
  emailRegister: '',
  currentUser: {},
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getEmailRegister: (state, { payload }) => {
      return { ...state, emailRegister: payload };
    },
    logOut: (state) => {
      return { ...state, currentUser: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingRegister: true },
        };
      })
      .addCase(register.fulfilled, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingRegister: false },
        };
      })
      .addCase(register.rejected, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingRegister: false },
        };
      })
      .addCase(login.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingLogin: true },
        };
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.data.token);
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingLogin: false },
        };
      })
      .addCase(login.rejected, (state) => {
        localStorage.setItem('token', '');
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingLogin: false },
        };
      })
      .addCase(getCurrentUser.pending, (state) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingCurrentUser: true },
        };
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: { ...state.isLoading, loadingCurrentUser: false },
          currentUser: action.payload.data.profile,
        };
      });
  },
});

export const { getEmailRegister, logOut } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
