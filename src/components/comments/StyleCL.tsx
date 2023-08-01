import { styled } from "styled-components";

export const CommentContainer = styled.div`
  margin-top: 30px;

  display: flex;
  flex-direction: column;
`;

export const CommentLine = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentWrapper = styled.div`
  margin-top: 5px;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

export const CommentBoxes = styled.div`
  margin-top: 1dvh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

export const WriterBox = styled.div`
  display: flex;
  justify-content: flex-end;

  font-size: 12px;

  margin-right: 10px;
  word-break: break-all;
`;

export const BoxToBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Btns = styled.div`
  margin-top: 13px;
`;

export const FeatBtn = styled.button`
  border: 1px solid white;
  background-color: white;

  font-size: 10px;
  cursor: pointer;
`;

export const CommentBox = styled.div`
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

export const CommentTextarea = styled.textarea`
  border-radius: 20px;

  background-color: #4789ef;
  padding: 5px 20px;

  width: 200px;
  min-height: 20px;
  font-size: 15px;
  word-break: normal;

  overflow-y: auto;
`;
