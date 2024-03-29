export enum AuthorizationStatus {
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
  NotFound = '/404',
}

export enum AppLink {
  Root = '/',
  Films = 'films',
  Player = 'player',
  Review = 'review',
  Mylist = 'mylist',
  Logout = 'logout',
}

export enum FilmTabs {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

export enum ColorCoefficient{
  DarkenCoefficient = -80,
  LightenCoefficient = 10,
}

export enum FilmRatingSettings{
  DefaultFilmRating = 0,
  MaxFilmRating = 10,
}

export const PLAYBACK_DELAY_MS = 1000;

export enum ComponentsDisplaySettings{
  MaxDisplayedSimilarFilmQuantity = 4,
  FilmToShowQuantityByDefault = 8,
}

export const MONTHS_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DEFAULT_FILE_LIST_GENRE = 'AllGenres';

export enum APIRoute {
  Films = '/films',
  Favorite = '/favorite',
  Similar = '/similar',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export enum RequestStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
}

export enum AddToFavoriteStatus {
  ADD = 1,
  REMOVE = 0,
}

export enum ReviewTextLength {
  MinReviewTextLength = 50,
  MaxReviewTextLength = 400,
}

export enum NameSpace {
  AppData = 'APP_DATA',
  AppProcess = 'APP_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export const PLAYER_UPDATE_INTERVAL_MS = 250;

export const MAX_SCALING_VALUE = 100;
