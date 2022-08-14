import { Fragment } from 'react';
import { DEFAULT_FILE_LIST_GENRE } from '../../constants';
import { useAppSelector } from '../../hooks';
import Film from '../../types/film';
import FilmListProps from '../../types/props/films-list-props';
import FilmCard from '../film-card/film-card';
import GenresList from '../genres-list/genres-list';
import ShowMoreButton from '../show-more-button/show-more-button';


function FilmList({isFavoriteFilmList} : FilmListProps) : JSX.Element{
  const selectedGenre = useAppSelector((state) => state.selectedGenre);
  const filmsToShowQuantity = useAppSelector((state) => state.filmsToShowQuantity);
  const films = useAppSelector((state) => state.films);
  let filteredFilmList = films;

  if(!isFavoriteFilmList && selectedGenre !== DEFAULT_FILE_LIST_GENRE){
    filteredFilmList = films.filter((film) => film.genre === selectedGenre);
  }

  if(!isFavoriteFilmList){
    filteredFilmList = filteredFilmList.slice(0, filmsToShowQuantity);
  }


  return (
    <Fragment>
      <GenresList films={films}/>
      <div className="catalog__films-list">
        {filteredFilmList.map((element : Film) => (
          <FilmCard key={element.id} film={element}/>
        ))}
      </div>
      <ShowMoreButton films={films}/>
    </Fragment>
  );
}

export default FilmList;
