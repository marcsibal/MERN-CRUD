import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/login/fulfilled', (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      });
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
