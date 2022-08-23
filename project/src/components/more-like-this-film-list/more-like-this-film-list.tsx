import { useEffect } from 'react';
import { MAX_DISPLAED_SIMILAR_FILM_QUANTITY } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearSimilarFilms } from '../../store/action';
import { fetchSimilarFilmsAction } from '../../store/api-actions';
import Film from '../../types/film';
import MoreLikeThisFilmListProps from '../../types/props/more-like-this-film-list-props';
import FilmCard from '../film-card/film-card';


function MoreLikeThisFilmList({filmId} : MoreLikeThisFilmListProps) : JSX.Element{
  const dispatch = useAppDispatch();
  let similarFilms = useAppSelector((state) => state.similarFilms);
  similarFilms = similarFilms.slice(0, MAX_DISPLAED_SIMILAR_FILM_QUANTITY);


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
