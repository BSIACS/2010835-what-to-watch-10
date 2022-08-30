import Film from '../../types/film';
import { makeFakeFilm, makeFakeFilmsArray } from '../../utils/mocks';
import { fetchFilmsAction } from '../api-actions';
import { appData, clearFavoriteFilms, clearSimilarFilms, resetFilm, setIsDataNotFound } from './app-data';

const initialStateMock = {
  films: [],
  favoriteFilms : [],
  similarFilms : [],
  film: null,
  comments: [],
  promo : ({} as Film),
  isDataLoaded: false,
  isDataNotFound: false,
};

describe('Reducer: appData', () => {
  it('without parameters should return initial state', () => {
    expect(appData.reducer(undefined, {type: 'UNLNOWN_ACTION'}))
      .toEqual(initialStateMock);
  });

  it('should assign false value to isDataNotFound', () => {
    expect(appData.reducer(initialStateMock, setIsDataNotFound(true)))
      .toEqual({ ...initialStateMock, isDataNotFound: true });
  });

  it('should assign empty array to favoriteFilms', () => {
    expect(appData.reducer({...initialStateMock, favoriteFilms: makeFakeFilmsArray()}, clearFavoriteFilms()))
      .toEqual({ ...initialStateMock });
  });

  it('should assign empty array to similarFilms', () => {
    expect(appData.reducer({...initialStateMock, similarFilms: makeFakeFilmsArray()}, clearSimilarFilms()))
      .toEqual({ ...initialStateMock });
  });

  it('should assign null to "film" field', () => {
    expect(appData.reducer({...initialStateMock, film: makeFakeFilm()}, resetFilm()))
      .toEqual({ ...initialStateMock });
  });

  it('should assign false value to "isDataLoaded" field', () => {
    expect(appData.reducer(initialStateMock, { type: fetchFilmsAction.pending.type }))
      .toEqual({ ...initialStateMock, isDataLoaded: true });
  });

  const fakeFilms = makeFakeFilmsArray();

  it('should update "films" by load films', () => {
    expect(appData.reducer(initialStateMock, { type: fetchFilmsAction.fulfilled.type, payload: fakeFilms }))
      .toEqual({ ...initialStateMock, films: fakeFilms });
  });
});
