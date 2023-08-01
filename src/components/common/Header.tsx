import React from "react";
import BTN from "../image/btn.png";
import ICON from "../image/icon.png";
import * as S from "./StyleHeader";

const Header: React.FC = () => {
  return (
    <S.Head>
      <S.IMG1 src={BTN}></S.IMG1>
      <S.IMG2 src={ICON}></S.IMG2>
    </S.Head>
  );
};

export default Header;
