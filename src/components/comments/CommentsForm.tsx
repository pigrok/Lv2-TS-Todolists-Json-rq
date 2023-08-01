import React, { useState } from "react";
import { createComment } from "../../redux/modules/comments";
import { useAppDispatch } from "../../hooks/hooks";
import { Todo } from "../../redux/modules/todos";
import { styled } from "styled-components";

interface CommentProps {
  todo: Todo;
}

const Comments: React.FC<CommentProps> = ({ todo }) => {
  const [writer, setWriter] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const dispatch = useAppDispatch();

  const onSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!writer || !contents) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return;
    }

    dispatch(createComment(writer, contents, todo));

    setWriter("");
    setContents("");
  };

  const onWriterHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWriter(e.target.value);
  };

  const onContentsHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContents(e.target.value);
  };

  return (
    <div>
      <CommentFormContainer onSubmit={onSubmitHandler}>
        <TitleInput
          type="writer"
          name="writer"
          value={writer}
          placeholder="작성자"
          onChange={onWriterHandler}
        />
        <BodyInputWrapper>
          {" "}
          <BodyInput
            type="contents"
            name="contents"
            value={contents}
            placeholder="내용"
            onChange={onContentsHandler}
          />
          <SubmitBtn type="submit">⬆</SubmitBtn>
        </BodyInputWrapper>
      </CommentFormContainer>
    </div>
  );
};

export default Comments;

const CommentFormContainer = styled.form`
  display: flex;
  margin-top: 20px;
`;

const TitleInput = styled.input`
  width: 100px;
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
  width: 300px;

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
