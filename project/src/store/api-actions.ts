import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, RequestStatus } from '../constants';
import { dropToken, saveToken } from '../services/token';
import fetchCommentsArgs from '../types/args/fetch-comments-args';
import fetchFilmArgs from '../types/args/fetch-film-args';
import loginArgs from '../types/args/login-args';
import SendNewCommentArgs from '../types/args/send-new-comment-args';
import Comment from '../types/comment';
import Film from '../types/film';
import { AppDispatch, State } from '../types/state';
import UserData from '../types/user-data';
import { loadComments, loadFilm, loadFilms, loadPromo, setAuthorized, setIsDataLoaded, setIsDataNotFound, setNotAuthorized, setUserData } from './action';


export const fetchFilmsAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'loadFilms',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data));
    dispatch(setIsDataLoaded());
  }
);

export const fetchFilmAction = createAsyncThunk<void, fetchFilmArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'loadFilm',
  async (_args, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${_args.id}`);
      dispatch(loadFilm(data));
    } catch (error) {
      dispatch(setIsDataNotFound(true));
    }
  }
);

export const fetchPromoAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'loadPromo',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(loadPromo(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, fetchCommentsArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'loadComments',
  async (_args, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${_args.id}`);
      dispatch(loadComments(data));
    } catch (error) {
      dispatch(setIsDataNotFound(true));
    }
  }
);

export const sendNewCommentAction = createAsyncThunk<void, SendNewCommentArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'loadComments',
  async (_args, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${_args.id}`, _args.newComment);
      dispatch(loadComments(data));
      _args.handleRequestStatusChanged(RequestStatus.SUCCESS);
    } catch (error) {
      _args.handleRequestStatusChanged(RequestStatus.ERROR);
    }
  }
);

export const checkAuthorizationAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'checkAuthorization',
  async (_args, {dispatch, extra: api}) => {
    try {
      const userData = (await api.get(APIRoute.Login)).data;
      dispatch(setAuthorized());
      dispatch(setUserData(userData));
    } catch {
      dispatch(setNotAuthorized());
      dispatch(setUserData(null));
    }
  }
);


export const loginAction = createAsyncThunk<void, loginArgs, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'login',
  async (_args, {dispatch, extra: api}) => {
    const userData = (await api.post<UserData>(APIRoute.Login, {email: _args.email, password: _args.password})).data;
    if(userData){
      saveToken(userData.token);
    }
    dispatch(setAuthorized());
    dispatch(setUserData(userData));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'logout',
  async (_args, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setNotAuthorized());
  }
);


