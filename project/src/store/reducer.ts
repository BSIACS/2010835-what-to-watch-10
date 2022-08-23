import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT } from '../constants';
import Comment from '../types/comment';
import Film from '../types/film';
import User from '../types/user-data';
import { changeGenre, clearFavoriteFilms, clearSimilarFilms, loadComments, loadFavoriteFilms, loadFilm, loadFilms, loadPromo, loadSimilarFilms, resetFilm, resetFilmsToShowQuantity, resetFilterSelectedGenre, setAuthorized, setIsDataLoaded, setIsDataNotFound, setIsFavorite, setNotAuthorized, setUserData, showMoreFilms } from './action';

type InitialState = {
  films : Film[],
  favoriteFilms : Film[],
  similarFilms : Film[],
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
  similarFilms : [],
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
    .addCase(loadFavoriteFilms, (state, action) => {state.favoriteFilms = action.payload;})
    .addCase(loadSimilarFilms, (state, action) => {state.similarFilms = action.payload;})
    .addCase(clearSimilarFilms, (state) => {state.similarFilms = [];})
    .addCase(clearFavoriteFilms, (state) => {state.favoriteFilms = [];})
    .addCase(setIsFavorite, (state, action) => {
      //Обновляем поле isFavorite выбранного фильма в состоянии список фильмов (films)
      let index = state.films.findIndex((film) => film.id === action.payload.id);
      state.films[index].isFavorite = action.payload.isFavorite;
      state.film = {...state.films[index], isFavorite: action.payload.isFavorite};

      //Обновляем массив избрвнных фильмов (favoriteFilms)
      if(action.payload.isFavorite){
        state.favoriteFilms.push({...state.films[index], isFavorite: action.payload.isFavorite});
      }
      else{
        index = state.favoriteFilms.findIndex((film) => film.id === action.payload.id);
        state.favoriteFilms.splice(index, 1);
      }

      //Если id фильма, переданного в качестве аргумента совпадает с id промо фильма, обновляем поле isFavorite в состоянии промо-филmм (promo)
      if(state.promo.id === action.payload.id){
        state.promo = {...action.payload};
      }

      state.favoriteFilms = [...state.favoriteFilms];
    })
    .addCase(loadFilm, (state, action) => {state.film = action.payload;})
    .addCase(resetFilm, (state) => {state.film = null;})
    .addCase(loadPromo, (state, action) => {state.promo = action.payload;})
    .addCase(setUserData, (state, action) => {state.user = action.payload;})
    .addCase(setAuthorized, (state) => {state.authorizationStatus = AuthorizationStatus.Auth;})
    .addCase(setNotAuthorized, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;

      state.favoriteFilms = [];
    })
    .addCase(setIsDataNotFound, (state, action) => {state.isDataNotFound = action.payload;})
    .addCase(loadComments, (state, action) => {state.comments = action.payload;})
    .addCase(setIsDataLoaded, (state) => {state.isDataLoaded = true;});
});

export {reducer};
