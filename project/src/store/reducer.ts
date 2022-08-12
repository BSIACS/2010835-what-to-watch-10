import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT } from '../constants';
import Film from '../types/film';
import { changeGenre, loadFilms, loadPromo, resetFilmsToShowQuantity, resetFilterSelectedGenre, setIsDataLoaded, showMoreFilms } from './action';

type InitialState = {
  films : Film[],
  promo : Film,
  selectedGenre : string | undefined,
  filmsToShowQuantity : number,
  isDataLoaded: boolean,
}

const initialState : InitialState = {
  films: [],
  promo : ({} as Film),
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: FILM_TO_SHOW_QUANTITY_BY_DEFAULT,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {state.selectedGenre = action.payload;})
    .addCase(showMoreFilms, (state) => {state.filmsToShowQuantity = state.filmsToShowQuantity + FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilmsToShowQuantity, (state) => {state.filmsToShowQuantity = FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilterSelectedGenre, (state) => {state.selectedGenre = DEFAULT_FILE_LIST_GENRE;})
    .addCase(loadFilms, (state, action) => {state.films = action.payload;})
    .addCase(loadPromo, (state, action) => {state.promo = action.payload;})
    .addCase(setIsDataLoaded, (state) => {state.isDataLoaded = true;});
});

export {reducer};
