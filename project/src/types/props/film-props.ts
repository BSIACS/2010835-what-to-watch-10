import Comment from '../comment';
import Film from '../film';
import User from '../user';

type FilmProps = {
  user: User,
  favoriteFilms : Film[],
  comments: Comment[],
}

export default FilmProps;
