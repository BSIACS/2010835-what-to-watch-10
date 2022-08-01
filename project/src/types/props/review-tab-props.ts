import Comment from '../comment';
import Film from '../film';

type ReviewTabProps = {
  film : Film | undefined,
  comments : Comment[],
}

export default ReviewTabProps;
