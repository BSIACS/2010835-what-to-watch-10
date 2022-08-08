import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT } from '../constants';
import { films } from '../mock/films';
import Film from '../types/film';
import { changeGenre, resetFilmsToShowQuantity, resetFilterSelectedGenre, showMoreFilms } from './action';

type InitialState = {
  films : Film[],
  selectedGenre : string | undefined,
  filmsToShowQuantity : number,
}

const initialState : InitialState = {
  films: films,
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: FILM_TO_SHOW_QUANTITY_BY_DEFAULT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {state.selectedGenre = action.payload;})
    .addCase(showMoreFilms, (state, action) => {state.filmsToShowQuantity = state.filmsToShowQuantity + FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilmsToShowQuantity, (state) => {state.filmsToShowQuantity = FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilterSelectedGenre, (state) => {state.selectedGenre = DEFAULT_FILE_LIST_GENRE;});
});

export {reducer};
