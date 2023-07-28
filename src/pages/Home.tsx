import React from "react";
import Form from "../components/Form";
import Todolist from "../components/Todolist";
import { RootState } from "../redux/config/configStore";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { useAppSelector } from "../hooks/hooks";

const Home: React.FC = () => {
  const todos = useAppSelector((state: RootState) => {
    return state.todos;
  });
  return (
    <div>
      <Header />
      <Form />
      <Todolist todos={todos} isDone={false} />
      <Todolist todos={todos} isDone={true} />
      <Footer />
    </div>
  );
};

export default Home;
