import { AddToFavoriteStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { setIsFavoriteAction } from '../../store/api-actions';
import { getFavoriteFilms } from '../../store/app-data/selectors';
import AddToMyListButtonProps from '../../types/props/add-to-my-list-button-props';

function AddToMyListButton({filmId, isFavorite} : AddToMyListButtonProps) : JSX.Element{

  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const handleAddToMyList = () => {
    store.dispatch(setIsFavoriteAction({filmId: filmId, status: isFavorite ? AddToFavoriteStatus.REMOVE : AddToFavoriteStatus.ADD}));
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleAddToMyList}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default AddToMyListButton;
