import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../modules/quizSlice";

const store = configureStore({
  reducer: {
    quizSlice,
  },
});
export default store;
