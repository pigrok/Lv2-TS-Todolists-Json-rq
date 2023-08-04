import React, { FormEvent, useState } from "react";
import * as S from "./StyleTF";
import { useMutation, useQueryClient } from "react-query";
import { Todo, createTodo, getCurrentTime } from "../../api/todos";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const queryClient = useQueryClient();

  const createTodoMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const createTodoHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      alert("필수값이 누락되었습니다. 확인해주세요");
      return false;
    }

    const newTodo: Omit<Todo, "id"> = {
      title,
      body,
      createAt: getCurrentTime(),
      isDone: false,
    };
    const confirmCreate = window.confirm("등록하시겠습니까?");
    if (!confirmCreate) {
      return false;
    }

    createTodoMutation.mutate(newTodo);
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
      <S.FormContainer onSubmit={createTodoHandler}>
        <S.TitleInput
          type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onTitleHandler}
        />
        <S.BodyInputWrapper>
          {" "}
          <S.BodyInput
            type="body"
            name="body"
            value={body}
            placeholder="내용"
            onChange={onBodyHandler}
          />
          <S.SubmitBtn type="submit">⬆</S.SubmitBtn>
        </S.BodyInputWrapper>
      </S.FormContainer>
    </div>
  );
};

export default TodoForm;
