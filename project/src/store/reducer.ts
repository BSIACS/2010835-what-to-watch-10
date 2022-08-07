import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_FILE_LIST_GENRE } from '../constants';
import { films } from '../mock/films';
import Film from '../types/film';
import { changeGenre } from './action';

type InitialState = {
  films : Film[],
  selectedGenre : string | undefined
}

const initialState : InitialState = {
  films: films,
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {state.selectedGenre = action.payload;});
});

export {reducer};
