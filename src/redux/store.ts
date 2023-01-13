import { configureStore } from '@reduxjs/toolkit';

import { albumsReducer } from './features/albums';
import { authReducer } from './features/auth/authSlice';
import { profileReducer } from './features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    albums: albumsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
