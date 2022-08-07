import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<string | undefined>('changeGenre');
export const getFilms = createAction('getFilms');
export const getFilmsByGenre = createAction('getFilmsByGenre');
