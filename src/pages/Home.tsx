import React from "react";
import Form from "../components/Form";
import Todolist from "../components/Todolist";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";

const Home: React.FC = () => {
  const todos = useSelector((state: RootState) => {
    return state.todos;
  });
  return (
    <div>
      <Form />
      <Todolist todos={todos} isDone={false} />
      <Todolist todos={todos} isDone={true} />
    </div>
  );
};

export default Home;
