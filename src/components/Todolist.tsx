import React from "react";
import { useDispatch } from "react-redux";
import { Todo, removeTodo, toggleTodo } from "../redux/modules/todos";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";

interface TodolistProps {
  todos: Todo[];
  isDone: boolean;
}

const Todolist: React.FC<TodolistProps> = ({ todos, isDone }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeHandler = (id: string) => {
    dispatch(removeTodo(id));
  };

  const toggleHandler = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const navDetailPage = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <div>{isDone ? <p>"해결했어요!!"</p> : <p> "할거에요!!"</p>}</div>
      <div>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo: Todo) => {
            return (
              <TodoBox key={todo.id}>
                <div>
                  <button onClick={() => navDetailPage(todo.id)}>
                    상세페이지
                  </button>
                  <div>
                    <label>제목 : {todo.title}</label>
                    <label>내용 : {todo.body}</label>
                  </div>
                </div>
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
              </TodoBox>
            );
          })}
      </div>
    </div>
  );
};

export default Todolist;

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;

  margin: 10px;

  padding: 10px;
`;
