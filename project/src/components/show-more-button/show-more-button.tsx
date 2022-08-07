import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/action';
import ShowMoreButtonProps from '../../types/props/show-more-button-props';

function ShowMoreButton({films} : ShowMoreButtonProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const filmsToShowQuantity = useAppSelector((state) => state.filmsToShowQuantity);

  const showMoreButtonClickHandler = () => dispatch(showMoreFilms());

  return (
    <div className="catalog__more" hidden={filmsToShowQuantity >= films.length}>
      <button className="catalog__button" type="button" onClick={showMoreButtonClickHandler}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;
