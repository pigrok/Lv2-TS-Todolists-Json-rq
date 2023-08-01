import React from "react";
import { Todo, toggleTodo, getCurrentTime } from "../../redux/modules/todos";
import { styled } from "styled-components";
import { useAppDispatch } from "../../hooks/hooks";

interface TodolistProps {
  todos: Todo[];
  isDone: boolean;
  setTodo: (todo: Todo) => void;
}

const Todolist: React.FC<TodolistProps> = ({ todos, isDone, setTodo }) => {
  const dispatch = useAppDispatch();

  const toggleHandler = (todo: Todo): void => {
    dispatch(toggleTodo({ id: todo.id, createAt: getCurrentTime() }));
  };

  const navDetailPage = (todo: Todo): void => {
    setTodo(todo);
  };

  return (
    <ListContainer>
      <div>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo: Todo) => {
            return (
              <TodoContainer key={todo.id}>
                <TodoWrapper onClick={() => navDetailPage(todo)}>
                  {isDone ? (
                    <>
                      <TitleBox isdone={+todo.isDone}>
                        <TitleLabel isdone={+todo.isDone}>
                          {todo.title}
                        </TitleLabel>
                      </TitleBox>{" "}
                      <ToggleButton
                        onClick={() => {
                          toggleHandler(todo);
                        }}
                        isdone={+todo.isDone}
                      >
                        {isDone ? "✖️" : "✔"}
                      </ToggleButton>
                    </>
                  ) : (
                    <>
                      <div>
                        <ToggleButton
                          onClick={() => {
                            toggleHandler(todo);
                          }}
                          isdone={+todo.isDone}
                        >
                          {isDone ? "✖️" : "✔"}
                        </ToggleButton>
                      </div>

                      <TitleBox isdone={+todo.isDone}>
                        <TitleLabel isdone={+todo.isDone}>
                          {todo.title}
                        </TitleLabel>
                      </TitleBox>
                    </>
                  )}
                </TodoWrapper>
                <DateLabel isdone={+todo.isDone}>
                  {isDone ? "완료" : "추가"} : {todo.createAt}
                </DateLabel>
              </TodoContainer>
            );
          })}
      </div>
    </ListContainer>
  );
};
export default Todolist;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 10px;

  padding: 10px;
`;

const TodoContainer = styled.div`
  margin: 5px 0 20px 0;
`;

const TodoWrapper = styled.div`
  display: flex;

  margin: 5px 0 5px 0;
`;

const TitleBox = styled.div<{ isdone: number }>`
  display: flex;
  flex-direction: column;

  border-radius: 20px;

  background-color: ${(props) => (props.isdone ? "#CFD3D8" : "#4789EF")};
  padding: 5px 20px;

  width: 180px;
  min-height: 20px;

  word-break: break-word;

  overflow-y: auto;
`;

const TitleLabel = styled.div<{ isdone: number }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isdone ? "flex-start" : "flex-end")};
`;

const DateLabel = styled.div<{ isdone: number }>`
  display: flex;
  justify-content: ${(props) => (props.isdone ? "flex-start" : "flex-end")};

  font-size: 10px;
`;

const ToggleButton = styled.button<{ isdone: number }>`
  border: 1px solid white;
  background-color: white;

  margin-top: 12px;

  color: ${(props) => (props.isdone ? "red" : "green")};
`;
