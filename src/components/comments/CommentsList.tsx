import React, { useState } from "react";
import * as S from "./StyleCL";
import { Todo } from "../../api/todos";
import {
  Comment,
  getComments,
  removeComment,
  updateComment,
} from "../../api/comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "../image/Loading.gif";
interface CommentProps {
  todo: Todo;
}

const CommentsList: React.FC<CommentProps> = ({ todo }) => {
  const {
    isLoading,
    isError,
    data: comments = [],
  } = useQuery<Comment[]>("comments", getComments);

  const [editComment, setEditComment] = useState<Comment | null>(null);

  const queryClient = useQueryClient();

  const removeCommentMutation = useMutation(removeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const removeCommentHandler = (id: number) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      removeCommentMutation.mutate(id);
    }
  };

  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const updateCommentHandler = (comment: Comment): void => {
    if (!editComment?.contents) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return;
    }

    const updatedComment = {
      ...comment,
      contents: editComment.contents,
    };
    updateCommentMutation.mutate(updatedComment);
    setEditComment(null);
  };

  const onCommentContentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEditComment({
      ...(editComment as Comment),
      contents: e.target.value,
    });
  };

  const openEidtMode = (comment: Comment): void => {
    setEditComment(comment);
  };

  if (isLoading) {
    return (
      <div>
        <img src={Loading}></img>
      </div>
    );
  }

  if (isError) {
    return <div>데이터를 불러오는 동안 오류가 발생했습니다</div>;
  }

  return (
    <S.CommentContainer>
      <S.CommentLine> Comment</S.CommentLine>
      <S.CommentWrapper>
        {comments
          .filter((comment) => comment.todoId == todo.id)
          .map((comment) => {
            const isEditing = editComment?.id === comment.id;
            return (
              <S.CommentBoxes key={comment.id}>
                <S.WriterBox>{comment.writer}</S.WriterBox>
                <S.BoxToBox>
                  <S.Btns>
                    {isEditing ? (
                      <div>
                        <S.FeatBtn
                          onClick={() => updateCommentHandler(comment)}
                        >
                          💾
                        </S.FeatBtn>
                      </div>
                    ) : (
                      <div>
                        <S.FeatBtn onClick={() => openEidtMode(comment)}>
                          ✏️
                        </S.FeatBtn>
                        <S.FeatBtn
                          onClick={() => removeCommentHandler(comment.id)}
                        >
                          🗑️
                        </S.FeatBtn>
                      </div>
                    )}
                  </S.Btns>
                  <>
                    {isEditing ? (
                      <S.CommentTextarea
                        value={editComment?.contents || ""}
                        onChange={onCommentContentsChange}
                      />
                    ) : (
                      <S.CommentBox>{comment.contents}</S.CommentBox>
                    )}
                  </>
                </S.BoxToBox>
              </S.CommentBoxes>
            );
          })}
      </S.CommentWrapper>
    </S.CommentContainer>
  );
};

export default CommentsList;
