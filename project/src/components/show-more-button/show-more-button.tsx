import { DEFAULT_FILE_LIST_GENRE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/app-process/app-process';
import { getFilmsToShowQuantity, getSelectedGenre } from '../../store/app-process/selectors';
import ShowMoreButtonProps from '../../types/props/show-more-button-props';

function ShowMoreButton({films} : ShowMoreButtonProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const filmsToShowQuantity = useAppSelector(getFilmsToShowQuantity);
  const selectedGenre = useAppSelector(getSelectedGenre);

  const showMoreButtonClickHandler = () => dispatch(showMoreFilms());

  let filteredFilms = [];

  if(selectedGenre !== DEFAULT_FILE_LIST_GENRE){
    filteredFilms = films.filter((film) => film.genre === selectedGenre);
  }
  else{
    filteredFilms = films;
  }

  return (
    <div className="catalog__more" hidden={filmsToShowQuantity >= filteredFilms.length}>
      <button className="catalog__button" type="button" onClick={showMoreButtonClickHandler}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;
