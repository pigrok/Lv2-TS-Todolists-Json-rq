import React, { useEffect } from "react";
import * as S from "./StyleTL";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Todo, getCurrentTime, getTodos, toggleTodo } from "../../api/todos";
import Loading from "../image/Loading.gif";

interface TodolistProps {
  isDone: boolean;
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setCount: React.Dispatch<React.SetStateAction<Todo[] | null>>;
}

const TodoList: React.FC<TodolistProps> = ({ isDone, setTodo, setCount }) => {
  const {
    isLoading,
    isError,
    data: todos = [],
  } = useQuery<Todo[]>("todos", getTodos);

  const queryClient = useQueryClient();

  const toggleTodoMutation = useMutation(toggleTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const toggleTodoHandler = (todo: Todo) => {
    const toggleTodos = {
      ...todo,
      isDone: !todo.isDone,
      createAt: getCurrentTime(),
    };

    toggleTodoMutation.mutate(toggleTodos);
  };

  // todo count
  useEffect(() => {
    setCount(todos);
  }, [todos]);

  const navDetailPage = (todo: Todo): void => {
    setTodo(todo);
  };
  if (isLoading) {
    return (
      <div>
        <img src={Loading}></img>
      </div>
    );
  }

  if (isError) {
    return <div>데이터를 불러오는 동안 오류가 발생했습니다</div>;
  }

  return (
    <>
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
                            toggleTodoHandler(todo);
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
                              toggleTodoHandler(todo);
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
    </>
  );
};
export default TodoList;
