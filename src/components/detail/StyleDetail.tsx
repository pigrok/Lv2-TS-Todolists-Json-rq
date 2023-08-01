import { styled } from "styled-components";

export const DetailTitle = styled.div`
  display: flex;
  justify-content: flex-end;

  font-size: 16px;
  margin: 25px 0 23px 0;
`;

export const TodoContainer = styled.div`
  background-color: white;

  border-radius: 10px;

  width: 450px;
  height: 565px;
  overflow-y: auto;
`;

export const DateBox = styled.div`
  padding: 1px;
`;

export const TodoWrapper = styled.div`
  padding: 20px;
`;

export const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleDetail = styled.div`
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

export const TitleTextarea = styled.textarea`
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

export const BodyDetail = styled.div`
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

export const BodyTextarea = styled.textarea`
  border-radius: 20px;

  background-color: #cfd3d8;
  padding: 10px 20px;

  width: 250px;
  height: 100px;

  margin-top: 10px;

  font-size: 16px;
  overflow-y: auto;
`;

export const BB = styled.div`
  display: flex;
`;

export const Btns = styled.div`
  margin-top: 110px;
`;

export const FeatBtn = styled.button`
  border: 1px solid white;
  background-color: white;

  font-size: 10px;
  cursor: pointer;
`;
