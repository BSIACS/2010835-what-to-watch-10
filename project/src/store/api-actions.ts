import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, RequestStatus } from '../constants';
import { dropToken, saveToken } from '../services/token';
import fetchCommentsArgs from '../types/args/fetch-comments-args';
import fetchFilmArgs from '../types/args/fetch-film-args';
import fetchSimilarFilmsArgs from '../types/args/fetch-similar-films-args';
import loginArgs from '../types/args/login-args';
import SendNewCommentArgs from '../types/args/send-new-comment-args';
import SetIsFavoriteArgs from '../types/args/set-is-favorite-args';
import Comment from '../types/comment';
import Film from '../types/film';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { clearFavoriteFilms } from './actions';


export const fetchFilmsAction = createAsyncThunk<Film[], undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchFilms',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);

    return data;
  }
);

export const fetchFilmAction = createAsyncThunk<Film, fetchFilmArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchFilm',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${_args.id}`);

    return data;
  }
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Film[], undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchFavoriteFilms',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Favorite}`);

    return data;
  }
);

export const fetchSimilarFilmsAction = createAsyncThunk<Film[], fetchSimilarFilmsArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchSimilarFilms',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(`/films/${_args.id}${APIRoute.Similar}`);

    return data;
  }
);


export const setIsFavoriteAction = createAsyncThunk<Film, SetIsFavoriteArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/setIsFavorite',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${APIRoute.Favorite}/${_args.filmId}/${_args.status}`);

    return data;
  }
);


export const fetchPromoAction = createAsyncThunk<Film, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchPromo',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);

    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Comment[], fetchCommentsArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchComments',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${_args.id}`);

    return data;
  }
);

export const sendNewCommentAction = createAsyncThunk<Comment[], SendNewCommentArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchComments',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${_args.id}`, _args.newComment);
    _args.handleRequestStatusChanged(RequestStatus.SUCCESS);

    return data;
  }
);

export const checkAuthorizationAction = createAsyncThunk<UserData, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'user/checkAuthorization',
  async (_args, {dispatch, extra: api}) => {
    const userData = (await api.get(APIRoute.Login)).data;

    return userData;
  }
);

export const loginAction = createAsyncThunk<UserData, loginArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'user/login',
  async (_args, {dispatch, extra: api}) => {
    const userData = (await api.post<UserData>(APIRoute.Login, {email: _args.email, password: _args.password})).data;
    if(userData){
      saveToken(userData.token);
    }

    return userData;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'user/logout',
  async (_args, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(clearFavoriteFilms());
  }
);


