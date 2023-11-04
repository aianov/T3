import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getPeopleData,
  setClickedPerson,
} from "../../store/features/swapiSlice";
import dayjs from "dayjs";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { SkeletonComponent } from "../Skeleton/Skeleton";

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 15px;
  background: #181818;
`;

const PersonDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 10px 0;
`;

const PersonItem = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  min-height: 200px;
  background: #212121;
  cursor: pointer;
  padding: 20px;
  font-size: 18px;
`;

export const Main: FC = () => {
  const [data, setData] = useState([]);
  const [tasksPerPage, setTasksPerPage]: any = useState("4");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await dispatch(getPeopleData());
      console.log(data.payload.results);
      setData(data.payload.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const lastTasksIndex = currentPage * parseInt(tasksPerPage);
  const firstTasksIndex = lastTasksIndex - parseInt(tasksPerPage);
  const currentTasks = data.slice(firstTasksIndex, lastTasksIndex);

  const paginate = (pageNumbers: number) => setCurrentPage(pageNumbers || 1);

  console.log(currentTasks);

  const checkGender = (gender: string) => {
    if (gender == "male") return "Мужчина";
    if (gender == "female") return "Женщина";
    return "Неизвестно";
  };

  const getDate = (time: string) =>
    dayjs().subtract(parseInt(time), "year").format("YYYY-MM-DD");

  const handlePerson = (person: any) => {
    dispatch(setClickedPerson(person));
  };

  return (
    <Items>
      <PersonDiv>
        {loading ? (
          <>
            {Array(4)
              .fill("")
              .map((_, i) => (
                <SkeletonComponent height={"200px"} bradius={"15px"} key={i} />
              ))}
          </>
        ) : (
          <>
            {currentTasks?.map((item: any, index: number) => (
              <Link
                to={`/person`}
                key={index}
                onClick={() => handlePerson(item)}
              >
                <PersonItem>
                  <p>Имя: {item.name}</p>
                  <p>Пол: {checkGender(item.gender)}</p>
                  <p>Рост: {item.height}</p>
                  <p>Вес: {`${item.mass}кг`}</p>
                  <p>Д.р: {getDate(item.birth_year)}</p>
                </PersonItem>
              </Link>
            ))}
          </>
        )}
      </PersonDiv>
      <PaginationDiv>
        <Pagination
          count={Math.ceil(data.length / parseInt(tasksPerPage))}
          onChange={(_, num) => paginate(num)}
        />
      </PaginationDiv>
    </Items>
  );
};
