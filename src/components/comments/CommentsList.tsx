import React, { useState } from "react";
import {
  Comment,
  removeComment,
  updateComment,
} from "../../redux/modules/comments";
import { RootState } from "../../redux/config/configStore";
import { Todo } from "../../redux/modules/todos";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import * as S from "./StyleCL";

interface CommentProps {
  todo: Todo;
}

const CommentsList: React.FC<CommentProps> = ({ todo }) => {
  const comments = useAppSelector((state: RootState) => {
    return state.comments;
  });

  const [editComments, setEditComments] = useState<Comment | null>(null);

  const dispatch = useAppDispatch();

  const onCommentContentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEditComments({
      ...(editComments as Comment),
      contents: e.target.value,
    });
  };

  const removeHandler = (id: string): void => {
    dispatch(removeComment(id));
  };

  const updateHandler = (commentId: string): void => {
    if (!editComments?.writer || !editComments?.contents) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return;
    }
    const updatedComment: Comment = {
      ...editComments,
      id: commentId,
    };
    dispatch(updateComment(updatedComment));
    setEditComments(null);
  };

  const openEidtMode = (comment: Comment): void => {
    setEditComments(comment);
  };

  return (
    <S.CommentContainer>
      <S.CommentLine> Comment</S.CommentLine>
      <S.CommentWrapper>
        {comments
          .filter((comment) => comment.todoId == todo.id)
          .map((comment) => {
            const isEditing = editComments?.id === comment.id;
            return (
              <S.CommentBoxes key={comment.id}>
                <S.WriterBox>{comment.writer}</S.WriterBox>
                <S.BoxToBox>
                  <S.Btns>
                    {isEditing ? (
                      <div>
                        <S.FeatBtn onClick={() => updateHandler(comment.id)}>
                          💾
                        </S.FeatBtn>
                      </div>
                    ) : (
                      <div>
                        <S.FeatBtn onClick={() => openEidtMode(comment)}>
                          ✏️
                        </S.FeatBtn>
                        <S.FeatBtn onClick={() => removeHandler(comment.id)}>
                          🗑️
                        </S.FeatBtn>
                      </div>
                    )}
                  </S.Btns>
                  <>
                    {isEditing ? (
                      <S.CommentTextarea
                        value={editComments?.contents || ""}
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
