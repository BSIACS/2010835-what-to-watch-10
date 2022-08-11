import {createAction} from '@reduxjs/toolkit';
import Film from '../types/film';

export const changeGenre = createAction<string | undefined>('changeGenre');
export const loadFilms = createAction<Film[]>('loadFilms');
export const loadPromo = createAction<Film>('loadPromo');
export const getFilmsByGenre = createAction('getFilmsByGenre');
export const showMoreFilms = createAction('showMoreFilms');
export const resetFilmsToShowQuantity = createAction('resetFilmsToShowQuantity');
export const resetFilterSelectedGenre = createAction('resetFilterSelectedGenre');
export const setIsDataLoaded = createAction('setIsDataLoaded');
