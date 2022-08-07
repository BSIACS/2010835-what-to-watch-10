import { MAX_DISPLAED_SIMILAR_FILM_QUANTITY } from '../../constants';
import Film from '../../types/film';
import MoreLikeThisFilmListProps from '../../types/props/more-like-this-film-list-props';
import FilmCard from '../film-card/film-card';


function MoreLikeThisFilmList({similarFilms} : MoreLikeThisFilmListProps) : JSX.Element{
  similarFilms = similarFilms.slice(0, MAX_DISPLAED_SIMILAR_FILM_QUANTITY);

  return (
    <div className="catalog__films-list">
      {similarFilms.map((element : Film) => (
        <FilmCard key={element.id} film={element}/>
      ))}
    </div>
  );
}

export default MoreLikeThisFilmList;
