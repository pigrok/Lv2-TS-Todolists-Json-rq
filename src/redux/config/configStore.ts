import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";
import comments from "../modules/comments";

const store = configureStore({
  reducer: {
    todos: todos,
    comments: comments,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
