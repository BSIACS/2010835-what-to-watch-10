import { NameSpace } from '../../constants';
import { State } from '../../types/state';


export const getSelectedGenre = (state: State): string | undefined => state[NameSpace.AppProcess].selectedGenre;
export const getFilmsToShowQuantity = (state: State): number => state[NameSpace.AppProcess].filmsToShowQuantity;

