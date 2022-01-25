import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setAuth = createAsyncThunk(
  "authReducer/setAuth",
  async ({ email, password }) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
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
  isValid: false,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setLogOut(state) {
      state.id = "";
      state.isLogin = false;
      state.accessToken = "";
      state.isValid = false;
    },
  },
  extraReducers: {
    [setAuth.pending.type]: (state) => {
      state.isLogin = false;
      state.isValid = true;
    },
    [setAuth.fulfilled.type]: (state, action) => {
      state.isLogin = true;
      state.isValid = false;
      state.id = action.payload.data.data.id;
      state.accessToken = action.payload.data.data.accessToken;
    },
    [setAuth.rejected.type]: (state) => {
      state.isLogin = false;
      state.isValid = true;
      state.id = "";
    },
  },
});

export const { setLogOut } = authReducer.actions;

export default authReducer.reducer;
