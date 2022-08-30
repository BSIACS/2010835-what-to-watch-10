import { DEFAULT_FILE_LIST_GENRE, FILM_TO_SHOW_QUANTITY_BY_DEFAULT } from '../../constants';
import { AppProcess } from '../../types/state';
import { appProcess, changeGenre, resetFilmsToShowQuantity, resetSelectedGenre, showMoreFilms } from './app-process';

const initialStateMock : AppProcess = {
  selectedGenre: DEFAULT_FILE_LIST_GENRE,
  filmsToShowQuantity: 8,
};

describe('Reducer: appProcess', () => {
  it('without parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNLNOWN_ACTION'}))
      .toEqual(initialStateMock);
  });

  const testGenre = 'Sci-fi';

  it('should assign correct value to selectedGenre', () => {
    expect(appProcess.reducer(initialStateMock, changeGenre(testGenre)))
      .toEqual({ ...initialStateMock, selectedGenre: testGenre});
  });

  it('should assign default selectedGenre value', () => {
    expect(appProcess.reducer({ ...initialStateMock, selectedGenre: testGenre}, resetSelectedGenre()))
      .toEqual(initialStateMock);
  });

  it('should increase the value by the number specified in the "FILM_TO_SHOW_QUANTITY_BY_DEFAULT" constant', () => {
    expect(appProcess.reducer(initialStateMock, showMoreFilms()))
      .toEqual({ ...initialStateMock, filmsToShowQuantity: initialStateMock.filmsToShowQuantity + FILM_TO_SHOW_QUANTITY_BY_DEFAULT});
  });

  it('should assign the number specified in the "FILM_TO_SHOW_QUANTITY_BY_DEFAULT" constant', () => {
    expect(appProcess.reducer(initialStateMock, resetFilmsToShowQuantity()))
      .toEqual({ ...initialStateMock, filmsToShowQuantity: FILM_TO_SHOW_QUANTITY_BY_DEFAULT});
  });
});
