export enum AuthorisationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Root = '/',
  SignIn = '/login',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Mylist = '/mylist',
}

export enum AppLink {
  Root = '/',
  Films = 'films',
  Player = 'player',
  Review = 'review',
  Mylist = 'mylist',
}

export enum FilmTabs {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

export const DARKEN_COEFFICIENT = -80;
export const LIGHTEN_COEFFICIENT = 10;

export const DEFAULT_FILM_RATING = 0;
export const MAX_FILM_RATING = 10;

export const PLAYBACK_DELAY_MS = 1000;
