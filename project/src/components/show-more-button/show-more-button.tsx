import { DEFAULT_FILE_LIST_GENRE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/action';
import ShowMoreButtonProps from '../../types/props/show-more-button-props';

function ShowMoreButton({films} : ShowMoreButtonProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const filmsToShowQuantity = useAppSelector((state) => state.filmsToShowQuantity);
  const selectedGenre = useAppSelector((state) => state.selectedGenre);

  const showMoreButtonClickHandler = () => dispatch(showMoreFilms());

  let filteredFilms = [];

  if(selectedGenre !== DEFAULT_FILE_LIST_GENRE){
    filteredFilms = films.filter((film) => film.genre === selectedGenre);
    // eslint-disable-next-line no-console
    console.log(selectedGenre, ' - films - ', films, 'filtered films - ', filteredFilms);
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
