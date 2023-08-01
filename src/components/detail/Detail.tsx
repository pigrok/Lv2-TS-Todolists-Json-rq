import React, { useState } from "react";
import { Todo, removeTodo, updateTodo } from "../../redux/modules/todos";
import { useAppDispatch } from "../../hooks/hooks";
import Comment from "../comments/CommentsForm";
import CommentsList from "../comments/CommentsList";
import CurrentDate from "../common/CurrentDate";
import * as S from "./StyleDetail";

interface DetailProps {
  todo: Todo;
  removeHandler: (id: string) => void;
}

const Detail: React.FC<DetailProps> = ({ todo, removeHandler }) => {
  const dispatch = useAppDispatch();

  const [editTodos, setEditTodos] = useState<Todo | null>(null);

  const onTitleChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEditTodos({
      ...(editTodos as Todo),
      title: e.target.value,
    });
  };

  const onBodyChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEditTodos({
      ...(editTodos as Todo),
      body: e.target.value,
    });
  };

  const removeTodoHandler = (id: string): void => {
    dispatch(removeTodo(id));
    removeHandler(id);
  };

  const updateHandler = (id: string): void => {
    if (!editTodos?.title || !editTodos?.body) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return;
    }
    const updatedTodo: Todo = {
      ...editTodos,
      id,
    };
    dispatch(updateTodo(updatedTodo));
    setEditTodos(null);
  };

  const openEidtMode = (todo: Todo): void => {
    setEditTodos(todo);
  };

  const isEditing = editTodos?.id === todo.id;

  return (
    <>
      <S.DetailTitle>
        <div>DETAIL</div>
      </S.DetailTitle>
      <div>
        <S.TodoContainer>
          <S.DateBox>
            <CurrentDate />
          </S.DateBox>
          <S.TodoWrapper>
            {todo ? (
              <>
                <S.TodoBox>
                  {isEditing ? (
                    <S.TitleTextarea
                      value={editTodos?.title}
                      onChange={onTitleChangeHandler}
                    />
                  ) : (
                    <S.TitleDetail> {todo.title}</S.TitleDetail>
                  )}
                  <S.BB>
                    <>
                      {isEditing ? (
                        <S.BodyTextarea
                          value={editTodos?.body}
                          onChange={onBodyChangeHandler}
                        />
                      ) : (
                        <S.BodyDetail> {todo.body}</S.BodyDetail>
                      )}
                    </>
                    <S.Btns>
                      {isEditing ? (
                        <S.FeatBtn onClick={() => updateHandler(todo.id)}>
                          💾
                        </S.FeatBtn>
                      ) : (
                        <div>
                          <S.FeatBtn onClick={() => openEidtMode(todo)}>
                            ✏️
                          </S.FeatBtn>
                          <S.FeatBtn onClick={() => removeTodoHandler(todo.id)}>
                            🗑️
                          </S.FeatBtn>
                        </div>
                      )}
                    </S.Btns>
                  </S.BB>
                </S.TodoBox>
              </>
            ) : (
              <p>not found</p>
            )}
            <div>{todo ? <CommentsList todo={todo} /> : null}</div>
          </S.TodoWrapper>
        </S.TodoContainer>
        <div>{todo ? <Comment todo={todo} /> : null}</div>
      </div>
    </>
  );
};

export default Detail;
