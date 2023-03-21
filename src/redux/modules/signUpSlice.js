import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../axios/api";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  error: null,
};

// 닉네임 중복 확인 썽크
export const __isSameNickname = createAsyncThunk(
  "IS_SAME_NICKNAME",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_QUIZ_URL}/user/signup/nkck`
      );
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 아이디 중복 확인 썽크

// 회원가입 썽크 함수
export const __signUpId = createAsyncThunk(
  "SIGN_UP_ID",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post(`/user/signup`, payload);
      // alert(data.message);
      return thunkAPI.fulfillWithValue(payload);
      // console.log("payload", payload);
      // console.log("response", response);
    } catch (error) {
      if (error.response.status === 412) {
        // return thunkAPI.rejectWithValue(error);

        alert(error.response.data.errorMessage.errorMessage);
      }
    }
  }
);

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    // 닉네임 중복 확인
    [__isSameNickname.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__isSameNickname.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      //   서버가 열리면 확인해보기
      //   if (state.users === action.payload) {
      //     return state.users = true
      //   }
    },
    [__isSameNickname.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default signUpSlice;
