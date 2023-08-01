import React, { useState } from "react";
import { createComment } from "../../redux/modules/comments";
import { Todo } from "../../redux/modules/todos";
import { useAppDispatch } from "../../hooks/hooks";
import * as S from "./StyleCF";

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
      <S.CommentFormContainer onSubmit={onSubmitHandler}>
        <S.TitleInput
          type="writer"
          name="writer"
          value={writer}
          placeholder="작성자"
          onChange={onWriterHandler}
        />
        <S.BodyInputWrapper>
          {" "}
          <S.BodyInput
            type="contents"
            name="contents"
            value={contents}
            placeholder="내용"
            onChange={onContentsHandler}
          />
          <S.SubmitBtn type="submit">⬆</S.SubmitBtn>
        </S.BodyInputWrapper>
      </S.CommentFormContainer>
    </div>
  );
};

export default Comments;
