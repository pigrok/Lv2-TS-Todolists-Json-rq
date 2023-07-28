import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shortid from "shortid";
import { Todo } from "./todos";

export type Comment = {
  id: string;
  writer: string;
  contents: string;
  todoId: string;
};

const initialState: Comment[] = [];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    createComment: {
      reducer: (state, action: PayloadAction<Comment>) => {
        state.push(action.payload);
      },
      prepare: (writer: string, contents: string, todo: Todo) => ({
        payload: {
          todoId: todo.id,
          id: shortid.generate(),
          writer,
          contents,
        },
      }),
    },
    removeComment: (state, action: PayloadAction<string>) => {
      return state.filter((comment) => comment.id !== action.payload);
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      return state.map((comment) =>
        comment.id === action.payload.id ? action.payload : comment
      );
    },
  },
});

export const { createComment, removeComment, updateComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
