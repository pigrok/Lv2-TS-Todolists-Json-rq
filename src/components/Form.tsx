import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/modules/todos";

const Form = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const dispatch = useDispatch();

  const onSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    dispatch(createTodo(title, body));

    setTitle("");
    setBody("");
  };

  const onTitleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onBodyHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBody(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onTitleHandler}
        />
        <input
          type="body"
          name="body"
          value={body}
          placeholder="내용"
          onChange={onBodyHandler}
        />
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default Form;
