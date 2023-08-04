import React, { FormEvent, useState } from "react";
import * as S from "./StyleCF";
import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../../api/todos";
import { Comment, createComment } from "../../api/comments";

interface CommentProps {
  todo: Todo;
}

const Comments: React.FC<CommentProps> = ({ todo }) => {
  const [writer, setWriter] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const createCommentHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!writer || !contents) {
      alert("필수값이 누락되었습니다. 확인해주세요");
      return false;
    }

    const newComment: Omit<Comment, "id"> = {
      todoId: todo.id,
      writer,
      contents,
    };

    const confirmCreate = window.confirm("등록하시겠습니까?");
    if (!confirmCreate) {
      return false;
    }

    createCommentMutation.mutate(newComment);
  };

  const onWriterHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWriter(e.target.value);
  };

  const onContentsHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContents(e.target.value);
  };

  return (
    <div>
      <S.CommentFormContainer onSubmit={createCommentHandler}>
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
