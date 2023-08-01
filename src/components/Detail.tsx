import React, { useState } from "react";
import { Todo, removeTodo, updateTodo } from "../redux/modules/todos";
import Header from "./common/Header";
import Comment from "./comments/CommentsForm";
import { useAppDispatch } from "../hooks/hooks";
import { styled } from "styled-components";
import CommentsList from "./comments/CommentsList";
import CurrentDate from "./common/CurrentDate";

interface TodolistProps {
  todo: Todo;
}

const Detail: React.FC<TodolistProps> = ({ todo }) => {
  // const { id } = useParams();
  // const todos = useSelector((state: RootState) => {
  //   return state.todos;
  // });
  // const todo: Todo | undefined = todos.find((todo) => todo.id === id);
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

  const removeHandler = (id: string): void => {
    dispatch(removeTodo(id));
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
      <DetailTitle>
        <div>DETAIL</div>
      </DetailTitle>
      <div>
        <TodoContainer>
          <DateBox>
            <CurrentDate />
          </DateBox>
          <TodoWrapper>
            {todo ? (
              <>
                <TodoBox>
                  {isEditing ? (
                    <TitleTextarea
                      value={editTodos?.title}
                      onChange={onTitleChangeHandler}
                    />
                  ) : (
                    <TitleDetail> {todo.title}</TitleDetail>
                  )}
                  <BB>
                    <>
                      {isEditing ? (
                        <BodyTextarea
                          value={editTodos?.body}
                          onChange={onBodyChangeHandler}
                        />
                      ) : (
                        <BodyDetail> {todo.body}</BodyDetail>
                      )}
                    </>
                    <Btns>
                      {isEditing ? (
                        <FeatBtn onClick={() => updateHandler(todo.id)}>
                          💾
                        </FeatBtn>
                      ) : (
                        <div>
                          <FeatBtn onClick={() => openEidtMode(todo)}>
                            ✏️
                          </FeatBtn>
                          <FeatBtn onClick={() => removeHandler(todo.id)}>
                            🗑️
                          </FeatBtn>
                        </div>
                      )}
                    </Btns>
                  </BB>
                </TodoBox>
              </>
            ) : (
              <p>not found</p>
            )}
            <div>{todo ? <CommentsList todo={todo} /> : null}</div>
          </TodoWrapper>
        </TodoContainer>
        <div>{todo ? <Comment todo={todo} /> : null}</div>
      </div>
    </>
  );
};

export default Detail;

const DetailTitle = styled.div`
  display: flex;
  justify-content: flex-end;

  font-size: 16px;
  margin: 25px 0 23px 0;
`;

const TodoContainer = styled.div`
  background-color: white;

  border-radius: 10px;

  width: 450px;
  height: 565px;
  overflow-y: auto;
`;

const DateBox = styled.div`
  padding: 1px;
`;

const TodoWrapper = styled.div`
  padding: 20px;
`;

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDetail = styled.div`
  border-radius: 20px;

  border: 1px solid none;

  background-color: #cfd3d8;
  padding: 5px 20px;

  width: 180px;
  height: 20px;
  min-height: 20px;

  margin-top: 12px;

  word-break: break-word;

  overflow-y: auto;
`;

const TitleTextarea = styled.textarea`
  border-radius: 20px;

  background-color: #cfd3d8;
  padding: 5px 20px;

  width: 180px;
  height: 20px;
  min-height: 20px;

  margin-top: 12px;

  font-size: 16px;

  word-break: break-word;

  overflow-y: auto;
`;

const BodyDetail = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 20px;

  background-color: #cfd3d8;
  padding: 10px 20px;

  width: 250px;
  min-height: 100px;
  height: 100px;

  margin-top: 10px;

  word-break: break-word;

  overflow-y: auto;
`;

const BodyTextarea = styled.textarea`
  border-radius: 20px;

  background-color: #cfd3d8;
  padding: 10px 20px;

  width: 250px;
  height: 100px;

  margin-top: 10px;

  font-size: 16px;
  overflow-y: auto;
`;

const BB = styled.div`
  display: flex;
`;

const Btns = styled.div`
  margin-top: 110px;
`;

const FeatBtn = styled.button`
  border: 1px solid white;
  background-color: white;

  font-size: 10px;
`;
