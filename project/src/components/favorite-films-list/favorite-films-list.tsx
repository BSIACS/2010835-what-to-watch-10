import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/app-data/selectors';
import Film from '../../types/film';
import FilmCard from '../film-card/film-card';
import ShowMoreButton from '../show-more-button/show-more-button';


function FavoriteFilmsList() : JSX.Element{
  const films = useAppSelector(getFavoriteFilms);


  return (
    <Fragment>
      <div className="catalog__films-list">
        {films.map((element : Film) => (
          <FilmCard key={element.id} film={element}/>
        ))}
      </div>
      <ShowMoreButton films={films}/>
    </Fragment>
  );
}

export default FavoriteFilmsList;
