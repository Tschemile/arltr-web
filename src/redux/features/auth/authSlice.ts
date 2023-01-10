import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '@/api';

// Type for our state
export interface AuthState {
  isLoading: boolean;
}

// Initial state
const initialState: AuthState = {
  isLoading: false,
};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  birth: string;
}

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (payload: User) => {
    const res = await api.post('/user', { ...payload });
    return res;
  }
);

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(createUser.fulfilled, (state) => {
        return { ...state, isLoading: false };
      })
      .addCase(createUser.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});

export const { reducer: authReducer } = authSlice;
