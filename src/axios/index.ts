import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

export const getPeople = () => {
  return api.get('/people');
};

export const getFilm = (filmId: string) => {
  return api.get(`/films/${filmId}`);
}

export const getVehicles = (vehiclesId: string) => {
  return api.get(`/vehicles/${vehiclesId}`);
}

export const getStarships = (starshipId: string) => {
  return api.get(`/starships/${starshipId}`);
}