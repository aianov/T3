import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilm, getPeople, getStarships, getVehicles } from '../../axios/index'

interface TState {
  data: any[] | undefined;
  loading: boolean | undefined;
  error: any | undefined;
  clickedPerson: any[] | undefined;
}

const initialState: TState = {
  data: undefined,
  loading: false,
  error: undefined,
  clickedPerson: undefined,
};

export const getPeopleData: any = createAsyncThunk('swapi/getPeople', async () => {
  const response = await getPeople();
  return response.data;
});

export const getFilmData = createAsyncThunk('swapi/getFilm', async (filmId: string) => {
  const response = await getFilm(filmId);
  return response.data;
});

export const getVehiclesData = createAsyncThunk('swapi/getVehicles', async (vehiclesId: string) => {
  const response = await getVehicles(vehiclesId);
  return response.data;
});

export const getStarshipsData = createAsyncThunk('swapi/getStarships', async (starshipsId: string) => {
  const response = await getStarships(starshipsId);
  return response.data;
});

const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    setClickedPerson: (state, action) => {
      state.clickedPerson = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(getPeopleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilmData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehiclesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStarshipsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // fullfiled
      .addCase(getPeopleData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getFilmData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getVehiclesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStarshipsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      // rejected
      .addCase(getPeopleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFilmData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getVehiclesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStarshipsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setClickedPerson } = swapiSlice.actions;
export default swapiSlice.reducer;
