import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

const initialState = {
  quiz: [],
  comment: [],
  dailQuiz: [],
  modal: false,
  istoken: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const __getQuiz = createAsyncThunk('getQuiz', async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/quiz`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __getDetailQuiz = createAsyncThunk(
  'getDetailQuiz',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/api/quiz/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const __getComment = createAsyncThunk('getComment', async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/comment/${payload}`);
    return thunkAPI.fulfillWithValue(response.data.comments);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __editQuiz = createAsyncThunk(
  'editQuiz',
  async ({ formData, inputValue }, thunkAPI) => {
    try {
      await api.put(`/api/quiz/${inputValue.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return thunkAPI.fulfillWithValue(inputValue);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const __editComment = createAsyncThunk(
  'editComment',
  async (payload, thunkAPI) => {
    try {
      await api.put(`/api/comment/${payload.commentId}`, { content: payload.content });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const __deleteQuiz = createAsyncThunk('deleteQuiz', async (payload, thunkAPI) => {
  try {
    await api.delete(`/api/quiz/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const __deleteComment = createAsyncThunk(
  'deleteComment',
  async (payload, thunkAPI) => {
    try {
      await api.delete(`${process.env.REACT_APP_QUIZ_URL}/api/comment/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const __addQuiz = createAsyncThunk(
  'ADD_QUIZ',
  async ({ formData, inputValue }, thunkAPI) => {
    try {
      await api.post(`/api/quiz`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return thunkAPI.fulfillWithValue(inputValue);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk('addComment', async (payload, thunkAPI) => {
  try {
    console.log(payload);
    await api.post(`/api/comment/${payload.quizId}`, { content: payload.content });
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
    mytoken: (state, action) => {
      state.istoken = action.payload;
      console.log('reducer', state.istoken);
    },
  },
  extraReducers: {
    /* 퀴즈 불러오기 */
    [__getQuiz.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.quiz = action.payload.allQuizs;
    },
    [__getQuiz.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    /* 상세 퀴즈 불러오기 */
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

    /* 댓글 불러오기 */
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

    /* 퀴즈 수정 */
    [__editQuiz.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.dailQuiz.quiz = { ...state.dailQuiz.quiz, payload };
    },
    [__editQuiz.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    /* 댓글 수정 */
    [__editComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comment = state.comment.map((item) =>
        item.commentId === action.payload.commentId
          ? {
              ...item,
              content: action.payload.content,
            }
          : item
      );
    },
    [__editComment.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    /* 퀴즈 삭제 */
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

    /* 댓글 삭제 */
    [__deleteComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comment = state.comment.filter((item) => item.commentId !== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },

    /* 퀴즈 추가 */
    [__addQuiz.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.quiz = [...state.quiz, payload];
    },
    [__addQuiz.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    /* 댓글 추가 */
    [__addComment.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log(action.payload);
      state.comment = [...state.comment, action.payload];
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default quizSlice.reducer;
export const { modalOnOff, mytoken } = quizSlice.actions;
