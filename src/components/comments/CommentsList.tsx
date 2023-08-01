import React, { useState } from "react";
import {
  Comment,
  removeComment,
  updateComment,
} from "../../redux/modules/comments";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/config/configStore";
import { Todo } from "../../redux/modules/todos";
import { styled } from "styled-components";

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
    <CommentContainer>
      <CommentLine> Comment</CommentLine>
      <CommentWrapper>
        {comments
          .filter((comment) => comment.todoId == todo.id)
          .map((comment) => {
            const isEditing = editComments?.id === comment.id;
            return (
              <CommentBoxes key={comment.id}>
                <WriterBox>{comment.writer}</WriterBox>
                <BoxToBox>
                  <Btns>
                    {isEditing ? (
                      <div>
                        <FeatBtn onClick={() => updateHandler(comment.id)}>
                          💾
                        </FeatBtn>
                      </div>
                    ) : (
                      <div>
                        <FeatBtn onClick={() => openEidtMode(comment)}>
                          ✏️
                        </FeatBtn>
                        <FeatBtn onClick={() => removeHandler(comment.id)}>
                          🗑️
                        </FeatBtn>
                      </div>
                    )}
                  </Btns>
                  <>
                    {isEditing ? (
                      <CommentTextarea
                        value={editComments?.contents || ""}
                        onChange={onCommentContentsChange}
                      />
                    ) : (
                      <CommentBox>{comment.contents}</CommentBox>
                    )}
                  </>
                </BoxToBox>
              </CommentBoxes>
            );
          })}
      </CommentWrapper>
    </CommentContainer>
  );
};

export default CommentsList;

const CommentContainer = styled.div`
  margin-top: 30px;

  display: flex;
  /* justify-content: flex-end; */
  flex-direction: column;
`;

const CommentLine = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentWrapper = styled.div`
  margin-top: 5px;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const CommentBoxes = styled.div`
  margin-top: 1dvh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const WriterBox = styled.div`
  display: flex;
  justify-content: flex-end;

  font-size: 12px;

  margin-right: 10px;
  word-break: break-all;
`;

const BoxToBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btns = styled.div`
  margin-top: 13px;
`;

const FeatBtn = styled.button`
  border: 1px solid white;
  background-color: white;

  font-size: 10px;
`;

const CommentBox = styled.div`
  display: flex;
  justify-content: flex-end;

  border-radius: 20px;

  background-color: #4789ef;
  padding: 5px 20px;

  width: 250px;
  min-height: 20px;
  height: 20px;
  font-size: 15px;

  word-break: normal;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

const CommentTextarea = styled.textarea`
  border-radius: 20px;

  background-color: #4789ef;
  padding: 5px 20px;

  width: 200px;
  min-height: 20px;
  font-size: 15px;
  word-break: normal;

  overflow-y: auto;
`;
