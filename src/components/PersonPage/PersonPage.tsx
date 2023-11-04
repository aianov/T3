import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import {
  getFilmData,
  getStarshipsData,
  getVehiclesData,
} from "../../store/features/swapiSlice";
import { FilmComponent } from "./components/FilmComponent";
import { SkeletonComponent } from "../Skeleton/Skeleton";
import { VehicleComponent } from "./components/VehicleComponent";
import { StarshipsComponent } from "./components/Starships";

const MainDiv = styled.div`
  background: #181818;
  border: 1px solid gray;
  width: 500px;
  min-height: 600px;
  font-size: 18px;
  padding: 15px;
  border-radius: 15px;
  h2 {
    color: white;
    width: 100%;
    font-size: 25px;
    text-align: center;
    margin: 10px 0;
  }
  p {
    margin-top: 5px;
  }
`;

export const PersonPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [filmLoading, setFilmLoading] = useState(false);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [starshipsLoading, setStarshipsLoading] = useState(false);
  const [filmsPage, setFilmsPage] = useState(0);
  const [vehiclesPage, setVehiclesPage] = useState(0);
  const [starshipsPage, setStarshipsPage] = useState(0);
  const [personData, setPersonData]: any = useState({});
  const [films, setFilms] = useState<any>([]);
  const [vehicles, setVehicles] = useState<any>([]);
  const [starships, setStarships] = useState<any>([]);
  const clickedPerson = useSelector((state: any) => state.swapi.clickedPerson);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  useEffect(() => {
    const fetchData = async () => {
      console.log("asd");
      const filmId = clickedPerson?.films[filmsPage]
        ?.split("/")
        .filter(Boolean)
        .pop();
      const vehiclesId = clickedPerson?.vehicles[vehiclesPage]
        ?.split("/")
        .filter(Boolean)
        .pop();
      const starshipsId = clickedPerson?.starships[starshipsPage]
        ?.split("/")
        .filter(Boolean)
        .pop();

      const promises = [];

      if (filmId !== undefined) {
        promises.push(dispatch(getFilmData(filmId)));
      }
      if (vehiclesId !== undefined) {
        promises.push(dispatch(getVehiclesData(vehiclesId)));
      }
      if (starshipsId !== undefined) {
        promises.push(dispatch(getStarshipsData(starshipsId)));
      }

      const [filmsData, vehiclesData, starshipsData] = await Promise.all(
        promises
      );
      setFilms([filmsData?.payload]);
      setVehicles([vehiclesData?.payload]);
      setStarships([starshipsData?.payload]);
      setLoading(false);
    };
    fetchData();

    if (clickedPerson) {
      setPersonData(clickedPerson);
      localStorage.setItem("person", JSON.stringify(clickedPerson));
    } else {
      const personFromLocalStorage = localStorage.getItem("person");
      if (personFromLocalStorage) {
        setPersonData(JSON.parse(personFromLocalStorage));
      }
    }
  }, []);

  const checkGender = (gender: string) => {
    if (gender == "male") return "Мужчина";
    if (gender == "female") return "Женщина";
    return "Неизвестно";
  };

  const getDate = (time: string) =>
    dayjs().subtract(parseInt(time), "year").format("YYYY-MM-DD");

  const addFilms = async () => {
    if (filmsPage + 1 === clickedPerson?.films?.length) return;
    setFilmLoading(true);
    setFilmsPage((prev: number) => prev + 1);
    const filmId = clickedPerson?.films[filmsPage + 1]
      ?.split("/")
      .filter(Boolean)
      .pop();
    const data = await dispatch(getFilmData(filmId));
    setFilms((prev: any) => [...prev, data?.payload]);
    setFilmLoading(false);
  };

  const addVehicles = async () => {
    if (vehiclesPage + 1 === clickedPerson?.vehicles?.length) return;
    setVehiclesLoading(true);
    setVehiclesPage((prev: number) => prev + 1);
    const vehiclesId = clickedPerson?.vehicles[vehiclesPage + 1]
      ?.split("/")
      .filter(Boolean)
      .pop();
    const data = await dispatch(getVehiclesData(vehiclesId));
    setVehicles((prev: any) => [...prev, data?.payload]);
    setVehiclesLoading(false);
  };

  const addStarships = async () => {
    if (starshipsPage + 1 === clickedPerson?.starships?.length) return;
    setStarshipsLoading(true);
    setStarshipsPage((prev: number) => prev + 1);
    const starshipsId = clickedPerson?.starships[starshipsPage + 1]
      ?.split("/")
      .filter(Boolean)
      .pop();
    const data = await dispatch(getStarshipsData(starshipsId));
    setStarships((prev: any) => [...prev, data?.payload]);
    setStarshipsLoading(false);
  };

  return (
    <MainDiv>
      <h2>Информация о персонаже</h2>
      <div className="df jcsb aic" style={{ margin: "20px 0" }}>
        <div>
          <p>Имя: {personData?.name}</p>
          <p>Рост: {personData?.height} см</p>
          <p>Вес: {personData?.mass} кг</p>
          <p>Цвет волос: {personData?.hair_color}</p>
        </div>
        <div>
          <p>Цвет кожи: {personData?.skin_color}</p>
          <p>Цвет глаз: {personData?.eye_color}</p>
          <p>Дата рождения: {getDate(personData?.birth_year)}</p>
          <p>Пол: {checkGender(personData?.gender)}</p>
        </div>
      </div>
      {films && (
        <div style={{ borderTop: "1px solid gray" }}>
          <h2>Фильмы</h2>
          <div className="df fdc aic">
            {loading ? (
              <SkeletonComponent
                width={"90%"}
                height={"120px"}
                bradius={"15px"}
              />
            ) : (
              <>
                {films?.map((item: any, index: number) => (
                  <FilmComponent data={item} key={index} />
                ))}
              </>
            )}
            {filmLoading && (
              <SkeletonComponent
                width={"90%"}
                height={"120px"}
                bradius={"15px"}
              />
            )}
            <p
              className="w100 df jcc aic cp"
              style={{ margin: "10px 0" }}
              onClick={() => addFilms()}
            >
              Показать еще
            </p>
          </div>
        </div>
      )}

      {vehicles && (
        <div style={{ borderTop: "1px solid gray" }}>
          <h2>Траспорты</h2>
          <div className="df fdc aic">
            {loading ? (
              <SkeletonComponent
                width={"90%"}
                height={"120px"}
                bradius={"15px"}
              />
            ) : (
              <>
                {vehicles?.map((item: any, index: number) => (
                  <VehicleComponent data={item} key={index} />
                ))}
              </>
            )}
            {vehiclesLoading && (
              <SkeletonComponent
                width={"90%"}
                height={"120px"}
                bradius={"15px"}
              />
            )}
            <p
              className="w100 df jcc aic cp"
              style={{ margin: "10px 0" }}
              onClick={() => addVehicles()}
            >
              Показать еще
            </p>
          </div>
        </div>
      )}

      {starships && (
        <div style={{ borderTop: "1px solid gray" }}>
          <h2>Корабли</h2>
          <div className="df fdc aic">
            {loading ? (
              <SkeletonComponent
                width={"90%"}
                height={"120px"}
                bradius={"15px"}
              />
            ) : (
              <>
                {starships?.map((item: any, index: number) => (
                  <StarshipsComponent data={item} key={index} />
                ))}
              </>
            )}
            {starshipsLoading && (
              <SkeletonComponent
                width={"90%"}
                height={"120px"}
                bradius={"15px"}
              />
            )}
            <p
              className="w100 df jcc aic cp"
              style={{ margin: "10px 0" }}
              onClick={() => addStarships()}
            >
              Показать еще
            </p>
          </div>
        </div>
      )}
    </MainDiv>
  );
};
