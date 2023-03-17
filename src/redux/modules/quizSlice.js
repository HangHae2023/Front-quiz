import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  quiz: [],
  comment: [],
  isLoading: false,
  isError: false,
  error: null,
};
export const __getQuiz = createAsyncThunk('getQuiz', async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_QUIZ_URL}/quiz`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __getComment = createAsyncThunk('getComment', async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_QUIZ_URL}/comment`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __editQuiz = createAsyncThunk('editQuiz', async (payload, thunkAPI) => {
  try {
    await axios.put(`${process.env.REACT_APP_QUIZ_URL}/quiz/${payload.id}`, payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
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

    [__getComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comment = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    [__editQuiz.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comment = action.payload;
    },
    [__editQuiz.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default quizSlice.reducer;
