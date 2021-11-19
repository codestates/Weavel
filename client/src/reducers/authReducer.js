import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setAuth = createAsyncThunk(
  "authReducer/setAuth",
  async ({ email, password }) => {
    return await axios.post(
      "http://localhost:4000/user/login",
      { email: email, password: password },
      {
        withCredentials: true,
      }
    );
  }
);

let initialState = {
  isLogin: false,
  id: "",
  accessToken: "",
  err: "",
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setLogOut(state) {
      state.id = "";
      state.isLogin = false;
      state.accessToken = "";
    },
  },
  extraReducers: {
    [setAuth.pending.type]: (state) => {
      state.isLogin = false;
    },
    [setAuth.fulfilled.type]: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.data.data.id;
      state.accessToken = action.payload.data.data.accessToken;
    },
    [setAuth.rejected.type]: (state, action) => {
      state.isLogin = false;
      state.id = "";
      state.err = action.payload.data.message;
    },
  },
});

export const { setLogOut } = authReducer.actions;

export default authReducer.reducer;
