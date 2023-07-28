import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { useParams } from "react-router-dom";
import { Todo } from "../redux/modules/todos";
import Header from "../components/ui/Header";
import Comment from "../components/Comments";

const Detail: React.FC = () => {
  const { id } = useParams();
  const todos = useSelector((state: RootState) => {
    return state.todos;
  });
  const todo: Todo | undefined = todos.find((todo) => todo.id === id);

  return (
    <>
      <Header />
      <div>
        {todo ? (
          <div>
            <div>제목 : {todo.title}</div>
            <div>내용 : {todo.body}</div>
          </div>
        ) : (
          <p>not found</p>
        )}
      </div>
      <div>{todo ? <Comment todo={todo} /> : null}</div>
    </>
  );
};

export default Detail;
