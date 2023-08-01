import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shortid from "shortid";

export type Todo = {
  id: string;
  title: string;
  body: string;
  createAt: string;
  isDone: boolean;
};

//  날짜 포맷팅
export const getCurrentTime = (): string => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}`;
};

const initialState: Todo[] = [
  {
    id: shortid.generate(),
    title: "알고리즘 문제풀기",
    body: "프로그래머스 1시간 동안 최대치 문제 풀기",
    createAt: getCurrentTime(),
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "TIL 쓰기",
    body: "매일 매일 TIL 쓰기 챌린지 도전 중^^",
    createAt: getCurrentTime(),
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "AWS 강의 듣기",
    body: "AWS의 모든 것 (All about AWS) KDT 실무형 프론트엔드 엔지니어 양성과정 2회차 강의 듣기 ",
    createAt: getCurrentTime(),
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "휴가 가기",
    body: "울진 바다로 가족 휴가 다녀오기!",
    createAt: getCurrentTime(),
    isDone: true,
  },
  {
    id: shortid.generate(),
    title: "TS 강의 듣기",
    body: "TS 1~5주차까지 강의 듣고, 정리하기",
    createAt: getCurrentTime(),
    isDone: true,
  },
];

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
          createAt: getCurrentTime(),
          isDone: false,
        },
      }),
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (
      state,
      action: PayloadAction<{ id: string; createAt: string }>
    ) => {
      const { id, createAt } = action.payload;
      return state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone, createAt: getCurrentTime() };
        } else {
          return todo;
        }
      });
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
  },
});

export const { createTodo, removeTodo, toggleTodo, updateTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
