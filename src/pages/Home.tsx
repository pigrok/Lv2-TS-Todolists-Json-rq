import React, { useState } from "react";

import { RootState } from "../redux/config/configStore";
import { Todo } from "../redux/modules/todos";
import { useAppSelector } from "../hooks/hooks";
import Header from "../components/common/Header";
import Form from "../components/todos/TodoForm";
import Todolist from "../components/todos/TodoList";
import Detail from "../components/detail/Detail";
import CurrentDate from "../components/common/CurrentDate";
import * as S from "./StyleHome";

const Home: React.FC = () => {
  const todos = useAppSelector((state: RootState) => {
    return state.todos;
  });

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <S.HomeContainer>
      <Header />
      <S.HomeWrapper>
        <S.TodolistContaniner>
          <S.TodoTitle>
            <S.TodoCount>{todos.length}</S.TodoCount>
            <p>TODOLIST</p>
          </S.TodoTitle>
          <S.BoxContainer>
            <CurrentDate />
            <S.Boxes>
              <S.DoneBox>
                <Todolist
                  todos={todos}
                  isDone={true}
                  setTodo={setSelectedTodo}
                />
              </S.DoneBox>
              <S.TodoBox>
                <Todolist
                  todos={todos}
                  isDone={false}
                  setTodo={setSelectedTodo}
                />
              </S.TodoBox>
            </S.Boxes>
          </S.BoxContainer>
          <Form />
        </S.TodolistContaniner>
        <S.DetailBox>
          {" "}
          {selectedTodo && <Detail todo={selectedTodo} />}
        </S.DetailBox>
      </S.HomeWrapper>
    </S.HomeContainer>
  );
};

export default Home;
