import React from "react";
import { Todo, toggleTodo, getCurrentTime } from "../../redux/modules/todos";
import { useAppDispatch } from "../../hooks/hooks";
import * as S from "./StyleTL";

interface TodolistProps {
  todos: Todo[];
  isDone: boolean;
  setTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodolistProps> = ({ todos, isDone, setTodo }) => {
  const dispatch = useAppDispatch();

  const toggleHandler = (todo: Todo): void => {
    dispatch(toggleTodo({ id: todo.id, createAt: getCurrentTime() }));
  };

  const navDetailPage = (todo: Todo): void => {
    setTodo(todo);
  };

  return (
    <S.ListContainer>
      <div>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo: Todo) => {
            return (
              <S.TodoContainer key={todo.id}>
                <S.TodoWrapper onClick={() => navDetailPage(todo)}>
                  {isDone ? (
                    <>
                      <S.TitleBox isdone={+todo.isDone}>
                        <S.TitleLabel isdone={+todo.isDone}>
                          {todo.title}
                        </S.TitleLabel>
                      </S.TitleBox>{" "}
                      <S.ToggleButton
                        onClick={() => {
                          toggleHandler(todo);
                        }}
                        isdone={+todo.isDone}
                      >
                        {isDone ? "✖️" : "✔"}
                      </S.ToggleButton>
                    </>
                  ) : (
                    <>
                      <div>
                        <S.ToggleButton
                          onClick={() => {
                            toggleHandler(todo);
                          }}
                          isdone={+todo.isDone}
                        >
                          {isDone ? "✖️" : "✔"}
                        </S.ToggleButton>
                      </div>

                      <S.TitleBox isdone={+todo.isDone}>
                        <S.TitleLabel isdone={+todo.isDone}>
                          {todo.title}
                        </S.TitleLabel>
                      </S.TitleBox>
                    </>
                  )}
                </S.TodoWrapper>
                <S.DateLabel isdone={+todo.isDone}>
                  {isDone ? "완료" : "추가"} : {todo.createAt}
                </S.DateLabel>
              </S.TodoContainer>
            );
          })}
      </div>
    </S.ListContainer>
  );
};
export default TodoList;
