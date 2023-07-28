import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { Todo, removeTodo, toggleTodo } from "../redux/modules/todos";

interface TodolistProps {
  todos: Todo[];
  isDone: boolean;
}

const Todolist: React.FC<TodolistProps> = ({ todos, isDone }) => {
  const dispatch = useDispatch();

  const removeHandler = (id: string) => {
    dispatch(removeTodo(id));
  };

  const toggleHandler = (id: string) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div>
      <div>{isDone ? <p>"해결했어요!!"</p> : <p> "할거에요!!"</p>}</div>
      <div>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo) => {
            return (
              <div key={todo.id}>
                <label>제목 : {todo.title}</label>
                <label>{todo.body}</label>
                <div>
                  <button
                    onClick={() => {
                      toggleHandler(todo.id);
                    }}
                  >
                    {isDone ? "취소" : "완료"}
                  </button>
                  <button
                    onClick={() => {
                      removeHandler(todo.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todolist;
