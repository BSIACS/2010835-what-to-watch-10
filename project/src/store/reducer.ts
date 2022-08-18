import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT } from '../constants';
import Comment from '../types/comment';
import Film from '../types/film';
import User from '../types/user-data';
import { changeGenre, loadComments, loadFavoriteFilms, loadFilm, loadFilms, loadPromo, resetFilm, resetFilmsToShowQuantity, resetFilterSelectedGenre, setAuthorized, setIsDataLoaded, setIsDataNotFound, setNotAuthorized, setUserData, showMoreFilms } from './action';

type InitialState = {
  films : Film[],
  favoriteFilms : Film[],
  promo : Film,
  film : Film | null,
  comments : Comment[],
  selectedGenre : string | undefined,
  filmsToShowQuantity : number,
  isDataLoaded : boolean,
  isDataNotFound : boolean,
  authorizationStatus : AuthorizationStatus,
  user : User,
}

const initialState : InitialState = {
  films: [],
  favoriteFilms : [],
  film: null,
  comments: [],
  promo : ({} as Film),
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: FILM_TO_SHOW_QUANTITY_BY_DEFAULT,
  isDataLoaded: false,
  isDataNotFound: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {state.selectedGenre = action.payload;})
    .addCase(showMoreFilms, (state) => {state.filmsToShowQuantity = state.filmsToShowQuantity + FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilmsToShowQuantity, (state) => {state.filmsToShowQuantity = FILM_TO_SHOW_QUANTITY_BY_DEFAULT;})
    .addCase(resetFilterSelectedGenre, (state) => {state.selectedGenre = DEFAULT_FILE_LIST_GENRE;})
    .addCase(loadFilms, (state, action) => {state.films = action.payload;})
    .addCase(loadFavoriteFilms, (state, action) => {state.films = action.payload;})
    .addCase(loadFilm, (state, action) => {state.film = action.payload;})
    .addCase(resetFilm, (state) => {state.film = null;})
    .addCase(loadPromo, (state, action) => {state.promo = action.payload;})
    .addCase(setUserData, (state, action) => {state.user = action.payload;})
    .addCase(setAuthorized, (state) => {state.authorizationStatus = AuthorizationStatus.Auth;})
    .addCase(setNotAuthorized, (state) => {state.authorizationStatus = AuthorizationStatus.NoAuth;})
    .addCase(setIsDataNotFound, (state, action) => {state.isDataNotFound = action.payload;})
    .addCase(loadComments, (state, action) => {state.comments = action.payload;})
    .addCase(setIsDataLoaded, (state) => {state.isDataLoaded = true;});
});

export {reducer};
