import { DEFAULT_FILE_LIST_GENRE } from '../../constants';
import { useAppSelector } from '../../hooks';
import Film from '../../types/film';
import FilmListProps from '../../types/props/films-list-props';
import FilmCard from '../film-card/film-card';


function FilmList({films, isFavoriteFilmList} : FilmListProps) : JSX.Element{
  const selectedGenre = useAppSelector((state) => state.selectedGenre);
  const filmsToShowQuantity = useAppSelector((state) => state.filmsToShowQuantity);
  let filteredFilmList = films;

  if(!isFavoriteFilmList && selectedGenre !== DEFAULT_FILE_LIST_GENRE){
    filteredFilmList = films.filter((film) => film.genre === selectedGenre);
  }

  if(!isFavoriteFilmList){
    filteredFilmList = filteredFilmList.slice(0, filmsToShowQuantity);
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
