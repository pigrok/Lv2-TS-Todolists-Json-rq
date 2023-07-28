import React, { useState } from "react";
import {
  Comment,
  createComment,
  removeComment,
  updateComment,
} from "../redux/modules/comments";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/config/configStore";
import { Todo } from "../redux/modules/todos";

interface CommentProps {
  todo: Todo;
}

const Comments: React.FC<CommentProps> = ({ todo }) => {
  const comments = useAppSelector((state: RootState) => {
    return state.comments;
  });

  const [writer, setWriter] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [editComments, setEditComments] = useState<Comment | null>(null);

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
  const removeHandler = (id: string) => {
    dispatch(removeComment(id));
  };

  const updateHandler = (commentId: string) => {
    if (!editComments?.writer || !editComments?.contents) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return false;
    }
    const updatedComment: Comment = {
      ...editComments,
      id: commentId,
    };
    dispatch(updateComment(updatedComment));
    setEditComments(null);
  };

  const openEidtMode = (comment: Comment) => {
    setEditComments(comment);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="writer"
          name="writer"
          value={writer}
          placeholder="작성자"
          onChange={onWriterHandler}
        />
        <input
          type="contents"
          name="contents"
          value={contents}
          placeholder="내용"
          onChange={onContentsHandler}
        />
        <button type="submit">작성</button>
      </form>
      <div>
        {comments
          .filter((comment) => comment.todoId == todo.id)
          .map((comment) => {
            const isEditing = editComments?.id === comment.id;
            return (
              <div key={comment.id}>
                <p>writer: {comment.writer}</p>
                <div>contents: {comment.contents}</div>
                {isEditing ? (
                  <textarea
                    value={editComments?.contents}
                    onChange={(e) =>
                      setEditComments({
                        ...editComments,
                        contents: e.target.value,
                      })
                    }
                  />
                ) : null}
                {isEditing ? (
                  <div>
                    <button onClick={() => updateHandler(comment.id)}>
                      save
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => openEidtMode(comment)}>edit</button>
                    <button onClick={() => removeHandler(comment.id)}>
                      delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
