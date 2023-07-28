import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shortid from "shortid";

export type Todo = {
  id: string;
  title: string;
  body: string;
  isDone: boolean;
};

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (title: string, body: string) => ({
        payload: {
          id: shortid.generate(),
          title,
          body,
          isDone: false,
        },
      }),
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
    },
  },
});

export const { createTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
