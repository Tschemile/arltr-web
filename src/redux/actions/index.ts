import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';

import type {
  ICreatePost,
  IInRelation,
  ILogin,
  IRelation,
  IUser,
} from './Interface';

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

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (payload: Record<string, string>) => {
    const res = await api.patch(`/profile`, { ...payload });
    return res;
  }
);

// relationship ❤️

export const makeRelation = createAsyncThunk(
  'relation/makeRelation',
  async (payload: IRelation) => {
    const res = await api.post(`/relation`, { ...payload });
    return res;
  }
);

export const getListFriend = createAsyncThunk(
  'relation/getListFriend',
  async (params: IInRelation) => {
    const res = await api.get(`/relation`, { params });
    return res.data;
  }
);

// POST

export const getCommentsOfPost = createAsyncThunk(
  'post/getCommentsOfPost',
  async (params: Record<string | 'post', string | number>) => {
    const res = await api.get(`/comment`, { params });
    return res.data;
  }
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async (payload: Record<string, string | undefined>) => {
    const res = await api.post('/comment', { ...payload });
    return res.data;
  }
);

export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (payload: FormData) => {
    const res = await api.post('/file/upload', payload);
    return res;
  }
);

export const createPost = createAsyncThunk(
  'post/createPost',
  async (payload: ICreatePost) => {
    const res = await api.post('/post', { ...payload });
    return res;
  }
);
