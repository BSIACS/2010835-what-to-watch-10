import { DEFAULT_FILE_LIST_GENRE } from '../../constants';
import { useAppSelector } from '../../hooks';
import Film from '../../types/film';
import FilmListProps from '../../types/props/films-list-props';
import { getUniqueRandomNumbers } from '../../utils';
import FilmCard from '../film-card/film-card';


function FilmList({films, filmsGenre, maxDisplayedQuantity} : FilmListProps) : JSX.Element{
  const selectedGenre = useAppSelector((state) => state.selectedGenre);
  let filteredFilmList = films;

  if(selectedGenre && selectedGenre !== DEFAULT_FILE_LIST_GENRE){
    filteredFilmList = films.filter((film) => film.genre === selectedGenre);
  }

  if(maxDisplayedQuantity){
    const randomIndexes = getUniqueRandomNumbers(0, filteredFilmList.length - 1, filteredFilmList.length >= maxDisplayedQuantity ? maxDisplayedQuantity : filteredFilmList.length);

    const buffer = [...filteredFilmList];
    filteredFilmList = [];
    for(let i = 0; i < randomIndexes.length; i++){
      filteredFilmList.push(buffer[randomIndexes[i]]);
    }
  }

  return (
    <div className="catalog__films-list">
      {filteredFilmList.map((element : Film) => (
        <FilmCard key={element.id} film={element}/>
      ))}
    </div>
  );
}

export default FilmList;
