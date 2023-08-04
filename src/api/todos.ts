import api from "../axios/api";

export interface Todo {
  id: number;
  title: string;
  body: string;
  createAt: string;
  isDone: boolean;
}

//  날짜 포맷팅
export const getCurrentTime = (): string => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}`;
};

const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get(`/todos`);
  return response.data;
};

const getDetail = async (todoId: string): Promise<Todo> => {
  const response = await api.get(`/todos/${todoId}`);
  return response.data;
};

const createTodo = async (newTodo: Omit<Todo, "id">): Promise<void> => {
  await api.post(`/todos`, newTodo);
};

const removeTodo = async (todoId: number): Promise<void> => {
  await api.delete(`/todos/${todoId}`);
};

const toggleTodo = async (toggleTodos: Todo): Promise<void> => {
  await api.patch(`/todos/${toggleTodos.id}`, {
    isDone: toggleTodos.isDone,
    createAt: getCurrentTime(),
  });
};

const updateTodo = async (todo: Todo): Promise<void> => {
  await api.patch(`/todos/${todo.id}`, todo);
};

export { getTodos, getDetail, createTodo, removeTodo, toggleTodo, updateTodo };
