import Comment from '../comment';
import Film from '../film';
import User from '../user';

type FilmProps = {
  films : Film[],
  user: User,
  favoriteFilms : Film[],
  comments: Comment[],
}

export default FilmProps;
