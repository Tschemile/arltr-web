import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  birth: string;
}

interface ILogin {
  usernameOrEmail: string;
  password: string;
}

export const register = createAsyncThunk(
  'auth/register',
  async (payload: IUser) => {
    const res = await api.post('/user', { ...payload });
    return res;
  }
);

export const login = createAsyncThunk('auth/login', async (payload: ILogin) => {
  const res = await api.post('/user/login', { ...payload });
  return res;
});

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const res = await api.get('/profile/me');
    return res;
  }
);

// Profile
export const getProfileUser = createAsyncThunk(
  'profile/getProfile',
  async (domain: string | string[] | undefined) => {
    const res = await api.get(`/profile/${domain}`);
    return res.data;
  }
);

export const getReletionCount = createAsyncThunk(
  'profile/getReletionCount',
  async () => {
    const res = await api.get('/relation/count');
    return res.data;
  }
);
