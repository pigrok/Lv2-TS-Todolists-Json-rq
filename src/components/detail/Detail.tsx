import React, { useState } from "react";
import Comment from "../comments/CommentsForm";
import CommentsList from "../comments/CommentsList";
import CurrentDate from "../common/CurrentDate";
import * as S from "./StyleDetail";
import { Todo, removeTodo, updateTodo } from "../../api/todos";
import { useMutation, useQueryClient } from "react-query";

interface DetailProps {
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const Detail: React.FC<DetailProps> = ({ todo, setTodo }) => {
  const [editTodos, setEditTodos] = useState<Todo | null>(null);
  const queryClient = useQueryClient();

  const removeTodoMutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const removeTodoHandler = (id: number) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      removeTodoMutation.mutate(id);
      setTodo(null);
    }
  };

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoHandler = (todo: Todo): void => {
    if (!editTodos?.title || !editTodos?.body) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return;
    }

    const updatedTodo = {
      ...todo,
      title: todo.title,
      bodoy: todo.body,
    };
    updateMutation.mutate(updatedTodo);
  };

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

  const openEditMode = (todo: Todo): void => {
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
                        <S.FeatBtn onClick={() => updateTodoHandler(todo)}>
                          💾
                        </S.FeatBtn>
                      ) : (
                        <div>
                          <S.FeatBtn onClick={() => openEditMode(todo)}>
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
