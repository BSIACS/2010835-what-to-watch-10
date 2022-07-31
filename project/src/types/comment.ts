import Reviewer from './reviewer';

type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Reviewer,
}

export default Comment;
