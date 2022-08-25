import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT, NameSpace } from '../../constants';
import { AppProcess } from '../../types/state';


const initialState : AppProcess = {
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: FILM_TO_SHOW_QUANTITY_BY_DEFAULT,
};

export const appProcess = createSlice({
  name: NameSpace.AppProcess,
  initialState,
  reducers : {
    changeGenre: (state, action) => {state.selectedGenre = action.payload;},
    resetFilterSelectedGenre: (state) => {state.selectedGenre = DEFAULT_FILE_LIST_GENRE;},
    showMoreFilms: (state) => {state.filmsToShowQuantity = state.filmsToShowQuantity + FILM_TO_SHOW_QUANTITY_BY_DEFAULT;},
    resetFilmsToShowQuantity: (state) => {state.filmsToShowQuantity = FILM_TO_SHOW_QUANTITY_BY_DEFAULT;},
  },
});

export const { changeGenre, resetFilterSelectedGenre, showMoreFilms, resetFilmsToShowQuantity } = appProcess.actions;
