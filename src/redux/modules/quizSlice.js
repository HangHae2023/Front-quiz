import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  quiz: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default houseSlice.reducer;
