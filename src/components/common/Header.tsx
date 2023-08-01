import React from "react";
import { styled } from "styled-components";
import BTN from "../image/btn.png";
import ICON from "../image/icon.png";

const Header: React.FC = () => {
  return (
    <Head>
      <IMG1 src={BTN}></IMG1>
      <IMG2 src={ICON}></IMG2>
    </Head>
  );
};

export default Header;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IMG1 = styled.img`
  height: 35px;
`;

const IMG2 = styled.img`
  padding: 3px 12px 0 0;
  height: 35px;
`;
