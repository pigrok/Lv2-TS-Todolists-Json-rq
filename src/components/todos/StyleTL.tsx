import { styled } from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 10px;

  padding: 10px;
`;

export const TodoContainer = styled.div`
  margin: 5px 0 20px 0;
  cursor: pointer;
`;

export const TodoWrapper = styled.div`
  display: flex;
  margin: 5px 0 5px 0;
`;

export const TitleBox = styled.div<{ isdone: number }>`
  display: flex;
  flex-direction: column;

  border-radius: 20px;

  background-color: ${(props) => (props.isdone ? "#CFD3D8" : "#4789EF")};
  padding: 5px 20px;

  width: 180px;
  min-height: 20px;

  word-break: break-word;

  overflow-y: auto;
`;

export const TitleLabel = styled.div<{ isdone: number }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isdone ? "flex-start" : "flex-end")};
`;

export const DateLabel = styled.div<{ isdone: number }>`
  display: flex;
  justify-content: ${(props) => (props.isdone ? "flex-start" : "flex-end")};

  font-size: 10px;
`;

export const ToggleButton = styled.button<{ isdone: number }>`
  border: 1px solid white;
  background-color: white;

  margin-top: 12px;

  color: ${(props) => (props.isdone ? "red" : "green")};

  cursor: pointer;
`;
