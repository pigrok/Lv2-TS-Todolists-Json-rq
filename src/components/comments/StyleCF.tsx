import { styled } from "styled-components";

export const CommentFormContainer = styled.form`
  display: flex;
  margin-top: 20px;
`;

export const TitleInput = styled.input`
  width: 100px;
  height: 30px;

  margin-right: 10px;

  border: 1px solid white;
  border-radius: 15px;
  padding-left: 15px;
`;

export const BodyInputWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const BodyInput = styled.input`
  width: 300px;

  border: 1px solid white;
  border-radius: 15px;
  padding-left: 15px;
`;

export const SubmitBtn = styled.button`
  position: absolute;
  right: 3px;
  bottom: 2px;
  height: 30px;

  width: 35px;

  background-color: #4789ef;
  border: 1px solid white;
  border-radius: 25px;

  color: white;
`;
