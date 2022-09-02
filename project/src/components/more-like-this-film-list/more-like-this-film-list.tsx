import { useEffect } from 'react';
import { ComponentsDisplaySettings } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarFilmsAction } from '../../store/api-actions';
import { clearSimilarFilms } from '../../store/app-data/app-data';
import { getSimilarFilms } from '../../store/app-data/selectors';
import Film from '../../types/film';
import MoreLikeThisFilmListProps from '../../types/props/more-like-this-film-list-props';
import FilmCard from '../film-card/film-card';


function MoreLikeThisFilmList({filmId} : MoreLikeThisFilmListProps) : JSX.Element{
  const dispatch = useAppDispatch();
  let similarFilms = useAppSelector(getSimilarFilms);
  similarFilms = similarFilms.slice(0, ComponentsDisplaySettings.MaxDisplayedSimilarFilmQuantity);


  useEffect(() => {
    dispatch(fetchSimilarFilmsAction({id: filmId}));

    return () => {dispatch(clearSimilarFilms());};
  }, [dispatch, filmId]);

  return (
    <div className="catalog__films-list">
      {similarFilms.map((element : Film) => (
        <FilmCard key={element.id} film={element}/>
      ))}
    </div>
  );
}

export default MoreLikeThisFilmList;
