import { AuthorizationStatus } from '../constants.js';
import {store} from '../store/index.js';
import Comment from './comment.js';
import Film from './film.js';
import { UserData } from './user-data.js';

export type UserProcess = {
  authorizationStatus : AuthorizationStatus,
  userData : UserData,
}

export type AppData = {
  films : Film[],
  favoriteFilms : Film[],
  similarFilms : Film[],
  promo : Film,
  film : Film | null,
  comments : Comment[],
  isDataLoaded : boolean,
  isDataNotFound : boolean,
}

export type AppProcess = {
  selectedGenre : string | undefined,
  filmsToShowQuantity : number,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
