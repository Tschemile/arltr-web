import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';

import type {
  ICreatePost,
  IEditComment,
  IGetGroups,
  IGetListPosts,
  IGroups,
  IInRelation,
  ILogin,
  IMembers,
  IReaction,
  IRelation,
  IUser,
} from './Interface';

// AUTH

export const register = createAsyncThunk(
  'auth/register',
  async (payload: IUser) => {
    const res = await api.post('/user', { ...payload });
    return res;
  }
);

export const verifyOTPCode = createAsyncThunk(
  'auth/register',
  async (payload: Record<'code', string>) => {
    const res = await api.post('/verify', { ...payload });
    return res;
  }
);

export const resendOTPCode = createAsyncThunk(
  'auth/register',
  async (payload: Record<'email', string>) => {
    const res = await api.post('/verify/generate-code', { ...payload });
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

export const getProfileListPosts = createAsyncThunk(
  'profile/getListPosts',
  async (params: IGetListPosts) => {
    const res = await api.get('/post', { params });
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

export const changeRelation = createAsyncThunk(
  'relation/changeRelation',
  async (payload: IRelation) => {
    const res = await api.put(`/relation`, { ...payload });
    return res;
  }
);

export const getListRelation = createAsyncThunk(
  'relation/getListRelation',
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

export const createPost = createAsyncThunk(
  'post/createPost',
  async (payload: ICreatePost) => {
    const res = await api.post('/post', { ...payload });
    return res;
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async (arg: Record<string, ICreatePost | any>) => {
    const res = await api.patch(`/post/${arg.postId}`, {
      ...arg.payload,
    });
    return res;
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId: string) => {
    const res = await api.delete(`/post/${postId}`);
    return res;
  }
);

export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async (commentId: string) => {
    const res = await api.delete(`/comment/${commentId}`);
    return res;
  }
);

export const editComment = createAsyncThunk(
  'post/editComment',
  async (arg: Record<string, IEditComment | any>) => {
    const res = await api.patch(`/comment/${arg.commentId}`, {
      ...arg.payload,
    });
    return res;
  }
);

// Reaction post
export const makeReaction = createAsyncThunk(
  'post/makeReaction',
  async (payload: IReaction) => {
    const res = await api.put('/react', { ...payload });
    return res;
  }
);

export const getListReaction = createAsyncThunk(
  'post/getListReaction',
  async (params: any) => {
    const res = await api.get('/react', { params });
    return res.data;
  }
);

// Upload File
export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (payload: FormData) => {
    const res = await api.post('/upload/image', payload);
    return res;
  }
);

export const uploadMultiFile = createAsyncThunk(
  'upload/uploadMultiFile',
  async (payload: FormData) => {
    const res = await api.post('/upload/image/multiple', payload);
    return res;
  }
);

// GROUPS

export const getListGroups = createAsyncThunk(
  'groups/getListGroups',
  async (params: IGetGroups) => {
    const res = await api.get('/group', { params });
    return res.data;
  }
);

export const createNewGroups = createAsyncThunk(
  'groups/createNewGroups',
  async (payload: IGroups) => {
    const res = await api.post('/group', { ...payload });
    return res;
  }
);

export const getGroupsById = createAsyncThunk(
  'groups/getGroupsById',
  async (id: string) => {
    const res = await api.get(`/group/${id}`);
    return res.data;
  }
);

export const editGroup = createAsyncThunk(
  'groups/editGroup',
  async (arg: Record<'id' | 'payload', IGroups | string>) => {
    const res = await api.patch(`/group/${arg.id}`, {
      ...(arg.payload as IGroups),
    });
    return res;
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (id: string) => {
    const res = await api.delete(`/group/${id}`);
    return res;
  }
);

// Member

export const getListMembers = createAsyncThunk(
  'members/getListMembers',
  async (params: IMembers) => {
    const res = await api.get('/member', { params });
    return res.data;
  }
);
export const outOfGroup = createAsyncThunk(
  'members/outOfGroup',
  async (idMember: string) => {
    const res = await api.delete(`/member/${idMember}`);
    return res;
  }
);
