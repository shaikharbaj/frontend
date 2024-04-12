import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Helper from "@/utils/helper";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import privateRequest from "@/Interceptor/privateRequest";

export const loadUserAsync = createAsyncThunk("auth/loadUser", async (payload, thunkAPI) => {
  try {
    const response = await privateRequest.get("/user/loaduser");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const loginUserAsync = createAsyncThunk("auth/loginUser", async (payload, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/user/login_user", payload);
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.data.validationerror) {
      return thunkAPI.rejectWithValue(error.response.data.validationerror);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
})

export const registerUserAsync = createAsyncThunk("auth/registerUser", async (payload, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/user/create_user", payload);
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.data.validationerror) {
      return thunkAPI.rejectWithValue(error.response.data.validationerror);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
})

export const updateuserProfileAsync = createAsyncThunk("auth/updateuserprofile", async (payload, thunkAPI) => {
  try {
    const response = await privateRequest.patch("http://localhost:8000/user/updateprofile", payload);
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.data.validationerror) {
      return thunkAPI.rejectWithValue(error.response.data.validationerror);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userinfo: Helper.getUser(),
    token: Helper.getLocalToken(),
    error: null,
    success: null
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
    setuserprofiledata: (state, action) => {
      state.userinfo = action.payload;
    },
    clearerror: (state, action) => {
      state.error = null;
      state.success = null
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
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const token = action.payload.token;
        console.log(token)
        const decodedUser = jwtDecode(token);
        state.userinfo = decodedUser;
        state.token = token;
        Helper.setToken(token);
        state.loading = false;
        state.success = true
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {

        state.loading = false;
        state.success = true
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateuserProfileAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateuserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userinfo = action.payload;

      })
      .addCase(updateuserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});
export const { setCredentials, logout, clearerror, setuserprofiledata } = authSlice.actions;
export default authSlice.reducer;
