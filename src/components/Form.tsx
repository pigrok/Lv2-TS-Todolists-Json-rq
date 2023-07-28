import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/modules/todos";
import { styled } from "styled-components";

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const dispatch = useDispatch();

  const onSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!title || !body) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return;
    }

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
      <FormContainer onSubmit={onSubmitHandler}>
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
      </FormContainer>
    </div>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;
