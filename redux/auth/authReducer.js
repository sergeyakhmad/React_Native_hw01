import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  userAvatar: null,
  userEmail: null,
  authStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userAvatar: payload.avatar,
      login: payload.login,
      userEmail: payload.email,
    }),
    changeAuthStatus: (state, { payload }) => ({
      ...state,
      authStatus: payload.authStatus,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.avatar,
    }),
    authSignOut: () => initialState,
  },
});
