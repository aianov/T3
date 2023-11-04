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

export const FilmComponent: FC<props> = ({ data }) => {
  return (
    <MainDiv>
      <p>{`Фильм: ${data?.title}`}</p>
      <p>{`Директор: ${data?.director}`}</p>
      <p>{`Серий: ${data?.episode_id}`}</p>
    </MainDiv>
  );
};
