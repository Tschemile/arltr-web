import { createSlice } from '@reduxjs/toolkit';

import { getListMembers } from '@/redux/actions';

export interface IListGroups {
  listMembers: Record<string, string>[];
  loading: boolean;
  totalMembers: number;
}

// Initial state
const initialState: IListGroups = {
  listMembers: [],
  loading: false,
  totalMembers: 0,
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getListMembers.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getListMembers.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          listMembers: payload.members,
          totalMembers: payload.total,
        };
      })
      .addCase(getListMembers.rejected, (state) => {
        return { ...state, loading: false };
      });
  },
});

export const { reducer: membersReducer } = membersSlice;
