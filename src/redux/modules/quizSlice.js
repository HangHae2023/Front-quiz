import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  quiz: [],
  comment: [],
  dailQuiz: [],
  modal: false,
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

export const __getDetailQuiz = createAsyncThunk(
  'getDetailQuiz',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUIZ_URL}/quiz/${payload}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

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
    await axios.put(
      // 실제 서버에서 사용
      `${process.env.REACT_APP_QUIZ_URL}/api/quiz/${payload.edit.id}`,
      payload.resourceUrl
    );
    // await axios.patch(
    //   `${process.env.REACT_APP_QUIZ_URL}/quiz/${payload.id}`,
    //   payload.edit
    // );
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __editComment = createAsyncThunk(
  'editComment',
  async (payload, thunkAPI) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_QUIZ_URL}/comment/${payload.commentId}`,
        payload.editContent
      ); // 실제서버
      // await axios.patch(
      //   `${process.env.REACT_APP_QUIZ_URL}/comment/${payload.commentId}`,
      //   payload
      // );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const __deleteQuiz = createAsyncThunk('deleteQuiz', async (payload, thunkAPI) => {
  try {
    await axios.delete(`${process.env.REACT_APP_QUIZ_URL}/api/quiz/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __deleteComment = createAsyncThunk(
  'deleteComment',
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${process.env.REACT_APP_QUIZ_URL}/comment/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const __addQuiz = createAsyncThunk('ADD_QUIZ', async (payload, thunkAPI) => {
  try {
    console.log(payload);
    await axios.delete(`${process.env.REACT_APP_QUIZ_URL}/api/quiz/`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    modalOnOff: (state, action) => {
      state.modal = !action.payload;
    },
  },
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

    [__getDetailQuiz.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getDetailQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.dailQuiz = action.payload;
    },
    [__getDetailQuiz.rejected]: (state, action) => {
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
    [__editQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.quiz = state.quiz.map((item) =>
        // item.postId === payload.id // 실제 서버에서 사용
        item.id === payload.id
          ? {
              ...item,
              title: payload.title,
              answer: payload.answer,
              explain: payload.explain,
            }
          : item
      );
    },
    [__editQuiz.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    [__editComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comment = state.comment.map((item) =>
        item.id === action.payload.commentId
          ? {
              ...item,
              content: action.payload.editContent,
            }
          : item
      );
    },
    [__editComment.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteQuiz.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.quiz = state.quiz.filter((item) => item.id !== action.payload);
    },
    [__deleteQuiz.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comment = state.comment.filter((item) => item.id !== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default quizSlice.reducer;
export const { modalOnOff } = quizSlice.actions;
