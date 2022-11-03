import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 1000 * 60 * 60 * 24;

export const tokenReducer = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false, // 현재 로그인 여부
    accessToken: null, // 토큰
    expireTime: 0, // 토큰 만료시간
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = 0;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenReducer.actions;

export default tokenReducer.reducer;
