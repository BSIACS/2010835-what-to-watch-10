import { createAPI } from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute } from '../constants';
import { checkAuthorizationAction, fetchCommentsAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoAction, fetchSimilarFilmsAction, loginAction, logoutAction, setIsFavoriteAction } from './api-actions';
import { makeFakeFilm, makeFakeFilmsArray, makeFakeUserData } from '../utils/mocks';
import { UserData } from '../types/user-data';
import { clearFavoriteFilms } from './app-data/app-data';

describe('Async actions', () => {
  const axiosAPI = createAPI();
  const mockAPI = new MockAdapter(axiosAPI);
  const middlewares = [thunk.withExtraArgument(axiosAPI)];

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof axiosAPI, Action>>(middlewares);

  //checkAuthorizationAction

  it('should set authorization status in "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthorizationAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthorizationAction.pending.type,
      checkAuthorizationAction.fulfilled.type
    ]);
  });

  //loginAction

  it('should dispatch RequriedAuthorization when POST /login', async () => {
    const mockUserData : UserData = makeFakeUserData();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, mockUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction({email: 'some_email@email.ru', password: '12345'}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', mockUserData?.token);
  });

  //logoutAction

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      clearFavoriteFilms.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch-token');
  });

  //fetchFilmsAction

  it('should dispatch Load_Films when GET /films', async () => {
    const mockFilms = makeFakeFilmsArray();

    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  //fetchFilmAction

  it('should dispatch Load_Film when GET /films', async () => {
    const mockFilm = makeFakeFilm();

    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilm.id}`)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction({id: mockFilm.id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  //fetchFavoriteFilmsAction

  it('should dispatch Load_Favorite_Films when GET /favorite', async () => {
    const mockFilms = makeFakeFilmsArray();

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type
    ]);
  });

  //fetchSimilarFilmsAction

  it('should dispatch Load_Similar_Films when GET /similar', async () => {
    const mockFilm = makeFakeFilm();
    const mockFilms = makeFakeFilmsArray();

    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilm.id}${APIRoute.Similar}`)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction({id: mockFilm.id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  //fetchPromoAction

  it('should dispatch Load_Promo when GET /promo', async () => {

    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  //setIsFavoriteAction

  it('should update isFavorite when POST on /favorite/id/status', async () => {
    const mockFilm = makeFakeFilm();
    const mockFilms = makeFakeFilmsArray();
    const mockStatus = 1;

    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockFilm.id}/${mockStatus}`)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(setIsFavoriteAction({filmId: mockFilm.id, status: mockStatus}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setIsFavoriteAction.pending.type,
      setIsFavoriteAction.fulfilled.type
    ]);
  });

  //fetchCommentsAction

  it('should dispatch Load_Comments when GET /comments/id', async () => {
    const mockFilm = makeFakeFilm();

    mockAPI
      .onGet(`${APIRoute.Comments}/${mockFilm.id}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction({id: mockFilm.id}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });
});
