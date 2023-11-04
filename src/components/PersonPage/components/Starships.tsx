import { FC } from "react";
import styled from "styled-components";

interface props {
  data: any;
}

const MainDiv = styled.div`
  border: 1px solid gray;
  width: 90%;
  padding: 20px 15px;
  border-radius: 15px;
  background: #212121;
  margin-bottom: 10px;
`;

export const StarshipsComponent: FC<props> = ({ data }) => {
  console.log(data);
  return (
    <MainDiv>
      <p>{`Название: ${data?.name}`}</p>
      <p>{`Модель: ${data?.model}`}</p>
      <p>{`Длина: ${data?.length}`}</p>
    </MainDiv>
  );
};
