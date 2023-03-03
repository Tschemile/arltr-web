import { configureStore } from "@reduxjs/toolkit";

import { albumsReducer } from "./features/albums";
import { authReducer } from "./features/auth/authSlice";
import { commentsReducer } from "./features/comments";
import { groupsReducer } from "./features/groups";
import { homeReducer } from "./features/home/homeSlice";
import { membersReducer } from "./features/members";
import { postsReducer } from "./features/posts";
import { profileReducer } from "./features/profile/profileSlice";
import { relationReducer } from "./features/relation/relationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    profile: profileReducer,
    posts: postsReducer,
    comments: commentsReducer,
    relation: relationReducer,
    groups: groupsReducer,
    members: membersReducer,
    albums: albumsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
