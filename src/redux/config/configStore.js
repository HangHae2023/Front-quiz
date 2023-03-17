import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../modules/quizSlice";
import signUpSlice from "../modules/signUpSlice";

const store = configureStore({
  reducer: {
    quizSlice,
    signUpSlice,
  },
});
export default store;
