import React, { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, resetFilmsToShowQuantity } from '../../store/app-process/app-process';
import { getSelectedGenre } from '../../store/app-process/selectors';
import GenresListProps from '../../types/props/genres-list-props';
import { getSetOfAvailableGenres } from '../../utils';

function GenresList({films} : GenresListProps) : JSX.Element{
  const selectedGenre = useAppSelector(getSelectedGenre);
  const dispatch = useAppDispatch();

  const CATALOG_GENRES_ITEM_ACTIVE = 'catalog__genres-item--active';

  //Обработчик выбора жанра отображаемого фильма
  const handleGenreLinkClick = (evt : React.MouseEvent<HTMLSpanElement>) => {
    dispatch(changeGenre((evt.target as HTMLSpanElement).dataset['value']));
    dispatch(resetFilmsToShowQuantity());
  };

  //Получаем массив с доступными для выбора жанрами
  const genres = Array.from(getSetOfAvailableGenres(films));

  return (
    <Fragment>
      <style>{`
            .catalog__genres-item  {
              cursor: pointer;}
              .catalog__genres-item :hover::after {
                display: none; }
            .${CATALOG_GENRES_ITEM_ACTIVE} .catalog__genres-link::after {
              display: block; }
          `}
      </style>
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${selectedGenre === 'AllGenres' ? CATALOG_GENRES_ITEM_ACTIVE : ''}`}>
          <span className="catalog__genres-link" data-value='AllGenres' onClick={handleGenreLinkClick}>All genres</span>
        </li>
        {genres.map((genre) => (
          <li key={genre} className={`catalog__genres-item ${selectedGenre === genre ? CATALOG_GENRES_ITEM_ACTIVE : ''}`}>
            <span className="catalog__genres-link" data-value={genre} onClick={handleGenreLinkClick}>{genre}</span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default GenresList;

