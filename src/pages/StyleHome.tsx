import { styled } from "styled-components";

export const HomeContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  margin-top: 100px;
`;

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 20px 20px;
`;

export const TodolistContaniner = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid black;
  border-radius: 10px;

  background-color: #ecebeb;

  width: 630px;
  height: 680px;
  padding: 20px;
`;

export const TodoTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TodoCount = styled.p`
  border-radius: 15px;

  background-color: #4789ef;
  color: white;

  width: 40px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;

  min-height: 560px;
  max-height: 560px;
  overflow-y: auto;

  border-radius: 10px;
`;

export const Boxes = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: white;
`;

export const TodoBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

export const DoneBox = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;

  margin-top: 40px;
`;

export const DetailBox = styled.div`
  border: 1px solid black;
  border-radius: 10px;

  background-color: #ecebeb;
  width: 450px;
  height: 700px;
  padding: 10px;
`;
