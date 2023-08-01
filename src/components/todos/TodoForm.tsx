import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../../redux/modules/todos";
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
        <TitleInput
          type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onTitleHandler}
        />
        <BodyInputWrapper>
          {" "}
          <BodyInput
            type="body"
            name="body"
            value={body}
            placeholder="내용"
            onChange={onBodyHandler}
          />
          <SubmitBtn type="submit">⬆</SubmitBtn>
        </BodyInputWrapper>
      </FormContainer>
    </div>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;

  margin-top: 20px;
`;

const TitleInput = styled.input`
  width: 200px;
  height: 30px;

  margin-right: 10px;

  border: 1px solid white;
  border-radius: 15px;
  padding-left: 15px;
`;

const BodyInputWrapper = styled.div`
  display: flex;
  position: relative;
  /* flex-direction: column; */
`;

const BodyInput = styled.input`
  width: 410px;

  border: 1px solid white;
  border-radius: 15px;
  padding-left: 15px;
`;

const SubmitBtn = styled.button`
  position: absolute;
  right: 3px;
  bottom: 2px;
  height: 30px;

  width: 35px;

  background-color: #4789ef;
  border: 1px solid white;
  border-radius: 25px;

  color: white;
`;
