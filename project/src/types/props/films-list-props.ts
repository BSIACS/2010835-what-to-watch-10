import Film from '../film';

type FilmListProps = {
  films : Film[],
  filmsGenre : string | undefined,
  maxDisplayedQuantity: number | undefined,
}

export default FilmListProps;
