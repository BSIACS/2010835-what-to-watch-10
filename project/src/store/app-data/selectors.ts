import { NameSpace } from '../../constants';
import Comment from '../../types/comment';
import Film from '../../types/film';
import { State } from '../../types/state';


export const getFilms = (state: State): Film[] => state[NameSpace.AppData].films;
export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.AppData].favoriteFilms;
export const getSimilarFilms = (state: State): Film[] => state[NameSpace.AppData].similarFilms;
export const getFilm = (state: State): Film | null => state[NameSpace.AppData].film;
export const getComments = (state: State): Comment[] => state[NameSpace.AppData].comments;
export const getPromo = (state: State): Film => state[NameSpace.AppData].promo;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.AppData].isDataLoaded;
export const getIsDataNotFound = (state: State): boolean => state[NameSpace.AppData].isDataNotFound;
