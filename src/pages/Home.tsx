import React, { useState } from "react";
import Form from "../components/todos/TodoForm";
import Todolist from "../components/todos/Todolist";
import { RootState } from "../redux/config/configStore";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useAppSelector } from "../hooks/hooks";
import Detail from "../components/Detail";
import { Todo } from "../redux/modules/todos";
import { styled } from "styled-components";
import CurrentDate from "../components/common/CurrentDate";

const Home: React.FC = () => {
  const todos = useAppSelector((state: RootState) => {
    return state.todos;
  });

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <HomeContainer>
      <Header />
      <HomeWrapper style={{ display: "flex" }}>
        <TodolistContaniner>
          <TodoTitle>
            <TodoCount>{todos.length}</TodoCount>
            <p>TODOLIST</p>
          </TodoTitle>
          <BoxContainer>
            <CurrentDate />
            <Boxes>
              <DoneBox>
                <Todolist
                  todos={todos}
                  isDone={true}
                  setTodo={setSelectedTodo}
                />
              </DoneBox>
              <TodoBox>
                <Todolist
                  todos={todos}
                  isDone={false}
                  setTodo={setSelectedTodo}
                />
              </TodoBox>
            </Boxes>
          </BoxContainer>
          <Form />
        </TodolistContaniner>
        <DetailBox> {selectedTodo && <Detail todo={selectedTodo} />}</DetailBox>
      </HomeWrapper>
      <Footer />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  margin-top: 100px;
`;

const HomeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 20px 20px;
`;

const TodolistContaniner = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid black;
  border-radius: 10px;

  background-color: #f5f5f5;

  width: 630px;
  height: 680px;
  padding: 20px;
`;

const TodoTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TodoCount = styled.p`
  border-radius: 15px;

  background-color: #4789ef;
  color: white;

  width: 40px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;

  min-height: 560px;
  max-height: 560px;
  overflow-y: auto;

  border-radius: 10px;
`;

const Boxes = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: white;
`;

const TodoBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const DoneBox = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;

  margin-top: 40px;
`;

const DetailBox = styled.div`
  border: 1px solid black;
  border-radius: 10px;

  background-color: #f5f5f5;
  width: 450px;
  height: 700px;
  padding: 10px;
`;
