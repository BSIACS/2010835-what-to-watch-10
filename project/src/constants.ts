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

export const MAX_DISPLAED_SIMILAR_FILM_QUANTITY = 4;
export const FILM_TO_SHOW_QUANTITY_BY_DEFAULT = 8;

export const MONTHS_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DEFAULT_FILE_LIST_GENRE = 'AllGenres';

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
}
