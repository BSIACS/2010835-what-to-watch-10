import Film from '../film';
import User from '../user';


type MainPageProps = {
  isDataLoaded : boolean,
  promoFilm : Film,
  films : Film[],
  user : User,
  favoriteFilms: Film[],
}

export default MainPageProps;
