import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/authSlice';
import { commentsReducer } from './features/comments';
import { profileReducer } from './features/profile/profileSlice';
import { relationReducer } from './features/relation/relationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    comments: commentsReducer,
    relation: relationReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
