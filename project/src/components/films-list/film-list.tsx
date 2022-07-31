//import { getRandomPositiveNumber } from '../../mock/utils';
import Film from '../../types/film';
import FilmListProps from '../../types/props/films-list-props';
import { getUniqueRandomNumbers } from '../../utils';
import FilmCard from '../film-card/film-card';


function FilmList({films, filmsGenre, maxDisplayedQuantity} : FilmListProps) : JSX.Element{

  if(filmsGenre && maxDisplayedQuantity){
    const moreLikeThisFilms : Film[] = [];

    const similarGenreFilms = films.filter((film) => film.genre === filmsGenre);

    const randomIndexes = getUniqueRandomNumbers(0, similarGenreFilms.length - 1, similarGenreFilms.length >= maxDisplayedQuantity ? maxDisplayedQuantity : similarGenreFilms.length);

    for(let i = 0; i < randomIndexes.length; i++){
      moreLikeThisFilms.push(similarGenreFilms[randomIndexes[i]]);
    }

    films = moreLikeThisFilms;
  }

  return (
    <div className="catalog__films-list">
      {films.map((element : Film) => (
        <FilmCard key={element.id} film={element}/>
      ))}
    </div>
  );
}

export default FilmList;
