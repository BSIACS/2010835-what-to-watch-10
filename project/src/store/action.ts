import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<string | undefined>('changeGenre');
export const getFilms = createAction('getFilms');
export const getFilmsByGenre = createAction('getFilmsByGenre');
export const showMoreFilms = createAction('showMoreFilms');
export const resetFilmsToShowQuantity = createAction('resetFilmsToShowQuantity');
export const resetFilterSelectedGenre = createAction('resetFilterSelectedGenre');
