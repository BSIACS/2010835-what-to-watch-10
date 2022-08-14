import Film from '../film';


type MainPageProps = {
  isDataLoaded : boolean,
  promoFilm : Film,
  films : Film[],
  favoriteFilms: Film[],
}

export default MainPageProps;
