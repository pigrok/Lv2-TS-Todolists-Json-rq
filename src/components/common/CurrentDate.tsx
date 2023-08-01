import React from "react";
import * as S from "./StyleCD";

const CurrentDate: React.FC = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = months[today.getMonth()];
  const date = today.getDate();
  const day = days[today.getDay()];

  const dateFormat = `${day}, ${month} ${date}, ${year}`;

  return <S.DateBox>{dateFormat}</S.DateBox>;
};

export default CurrentDate;
