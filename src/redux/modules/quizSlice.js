import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const QUIZ_URL = '/api/quiz';
const initialState = {
  quiz: [],
  isLoading: false,
  isError: false,
  error: null,
};
export const __getQuiz = createAsyncThunk('getQuiz', async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_QUIZ_URL}${QUIZ_URL}`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: {
    [__getQuiz.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.quiz = action.payload;
    },
    [__getQuiz.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default quizSlice.reducer;
