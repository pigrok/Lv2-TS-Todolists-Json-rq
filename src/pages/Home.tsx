import React, { useState } from "react";
import Header from "../components/common/Header";
import TodoForm from "../components/todos/TodoForm";
import Todolist from "../components/todos/Todolist";
import Detail from "../components/detail/Detail";
import CurrentDate from "../components/common/CurrentDate";
import * as S from "./StyleHome";
import { Todo } from "../api/todos";

const Home: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [count, setCount] = useState<Todo[] | null>(null);

  return (
    <S.HomeContainer>
      <Header />
      <S.HomeWrapper>
        <S.TodolistContaniner>
          <S.TodoTitle>
            <S.TodoCount>{count?.length}</S.TodoCount>
            <p>TODOLIST</p>
          </S.TodoTitle>
          <S.BoxContainer>
            <CurrentDate />
            <S.Boxes>
              <S.DoneBox>
                <Todolist
                  setCount={setCount}
                  isDone={true}
                  setTodo={setSelectedTodo}
                />
              </S.DoneBox>
              <S.TodoBox>
                <Todolist
                  setCount={setCount}
                  isDone={false}
                  setTodo={setSelectedTodo}
                />
              </S.TodoBox>
            </S.Boxes>
          </S.BoxContainer>
          <TodoForm />
        </S.TodolistContaniner>
        {selectedTodo ? (
          <S.DetailBox>
            <Detail todo={selectedTodo} setTodo={setSelectedTodo} />
          </S.DetailBox>
        ) : (
          <S.Empty>"TODO를 선택해주세요!"</S.Empty>
        )}
      </S.HomeWrapper>
    </S.HomeContainer>
  );
};

export default Home;
