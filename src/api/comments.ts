import api from "../axios/api";

export interface Comment {
  id: number;
  writer: string;
  contents: string;
  todoId: number;
}

const getComments = async (): Promise<Comment[]> => {
  const response = await api.get(`/comments`);
  return response.data;
};

const createComment = async (
  newComment: Omit<Comment, "id">
): Promise<void> => {
  await api.post(`/comments`, newComment);
};

const removeComment = async (commentId: number): Promise<void> => {
  await api.delete(`/comments/${commentId}`);
};

const updateComment = async (comment: Comment): Promise<void> => {
  await api.patch(`/comments/${comment.id}`, comment);
};

export { getComments, createComment, removeComment, updateComment };
