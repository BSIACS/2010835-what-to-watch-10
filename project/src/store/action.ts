import {createAction} from '@reduxjs/toolkit';
import Film from '../types/film';
import UserData from '../types/user-data';

export const changeGenre = createAction<string | undefined>('changeGenre');
export const loadFilms = createAction<Film[]>('loadFilms');
export const loadFilm = createAction<Film>('loadFilm');
export const resetFilm = createAction('resetFilm');
export const loadPromo = createAction<Film>('loadPromo');
export const getFilmsByGenre = createAction('getFilmsByGenre');
export const showMoreFilms = createAction('showMoreFilms');
export const resetFilmsToShowQuantity = createAction('resetFilmsToShowQuantity');
export const resetFilterSelectedGenre = createAction('resetFilterSelectedGenre');
export const setIsDataLoaded = createAction('setIsDataLoaded');
export const setAuthorized = createAction('setAuthorized');
export const setNotAuthorized = createAction('setNotAuthorized');
export const setUserData = createAction<UserData>('setUserData');
