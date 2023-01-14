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

interface IRelation {
  user: string;
  type: 'FOLLOW' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
}
interface IInRelation {
  status?: string;
  type: 'FOLLOWING' | 'FOLLOWER' | 'FRIEND' | 'BLOCKED' | 'OWNER' | 'LIKED';
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

// relationship ❤️
export const getRelationCount = createAsyncThunk(
  'profile/getRelationCount',
  async () => {
    const res = await api.get('/relation/count');
    return res.data;
  }
);

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
    const res = await api.get(`/relation${params}`);
    return res;
  }
);

export const getCommentsOfPost = createAsyncThunk(
  'post/getCommentsOfPost',
  async (id: string) => {
    const res = await api.get(`/comment/${id}`);
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
