import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Helper from "@/utils/helper";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import privateRequest from "@/Interceptor/privateRequest";

export const loadUserAsync = createAsyncThunk("auth/loadUser", async () => {
  try {
    const response = await privateRequest.get("/user/loaduser");
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userinfo: Helper.getUser(),
    token: Helper.getLocalToken(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const token = action.payload.token;
      const decodedUser = jwtDecode(token);

      state.userinfo = decodedUser;
      state.auth = token;

      Helper.setToken(token);
    },
    logout: (state, action) => {
      state.token = null;
      state.userinfo = null;
      Helper.removeToken();
    },
    setuserprofiledata:(state,action)=>{
        state.userinfo=action.payload;
    },
    clearerror: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder;
    builder
      .addCase(loadUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userinfo = action.payload;
      })
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCredentials, logout,clearerror,setuserprofiledata} = authSlice.actions;
export default authSlice.reducer;
