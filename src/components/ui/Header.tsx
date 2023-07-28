import React from "react";
import { styled } from "styled-components";

const Header: React.FC = () => {
  return <Head>Header</Head>;
};

export default Header;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

  font-size: 40px;

  border: 1px solid black;
`;
