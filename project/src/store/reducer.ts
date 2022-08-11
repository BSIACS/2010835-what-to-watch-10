import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT } from '../constants';
import Film from '../types/film';
import { changeGenre, loadFilms, resetFilmsToShowQuantity, resetFilterSelectedGenre, setIsDataLoaded, showMoreFilms } from './action';

type InitialState = {
  films : Film[],
  selectedGenre : string | undefined,
  filmsToShowQuantity : number,
  isDataLoaded: boolean,
}

const initialState : InitialState = {
  films: [],
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: FILM_TO_SHOW_QUANTITY_BY_DEFAULT,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {state.selectedGenre = action.payload;})
    .addCase(showMoreFilms, (state, action) => {state.filmsToShowQuantity = state.filmsToShowQuantity + FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilmsToShowQuantity, (state) => {state.filmsToShowQuantity = FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilterSelectedGenre, (state) => {state.selectedGenre = DEFAULT_FILE_LIST_GENRE;})
    .addCase(loadFilms, (state, action) => {state.films = action.payload;})
    .addCase(setIsDataLoaded, (state) => {state.isDataLoaded = true;});
});

export {reducer};
