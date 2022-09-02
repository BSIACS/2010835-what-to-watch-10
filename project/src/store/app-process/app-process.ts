import { createSlice } from '@reduxjs/toolkit';
import { ComponentsDisplaySettings, DEFAULT_FILE_LIST_GENRE, NameSpace } from '../../constants';
import { AppProcess } from '../../types/state';


const initialState : AppProcess = {
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: ComponentsDisplaySettings.FilmToShowQuantityByDefault,
};

export const appProcess = createSlice({
  name: NameSpace.AppProcess,
  initialState,
  reducers : {
    changeGenre: (state, action) => {state.selectedGenre = action.payload;},
    resetSelectedGenre: (state) => {state.selectedGenre = DEFAULT_FILE_LIST_GENRE;},
    showMoreFilms: (state) => {state.filmsToShowQuantity = state.filmsToShowQuantity + ComponentsDisplaySettings.FilmToShowQuantityByDefault;},
    resetFilmsToShowQuantity: (state) => {state.filmsToShowQuantity = ComponentsDisplaySettings.FilmToShowQuantityByDefault;},
  },
});

export const { changeGenre, resetSelectedGenre, showMoreFilms, resetFilmsToShowQuantity } = appProcess.actions;
