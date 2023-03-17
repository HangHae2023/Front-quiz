import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __isSameNickname = createAsyncThunk(
  "isSameNickname",
  async (payload, thunkAPI) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/signup/nkck`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [__isSameNickname.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__isSameNickname.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (state.users === action.payload) {
        return state.users = true
      }
    },
    [__isSameNickname.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default signUpSlice;
