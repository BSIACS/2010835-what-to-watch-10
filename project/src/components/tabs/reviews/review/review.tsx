import { MONTHS_NAMES } from '../../../../constants';
import ReviewProps from '../../../../types/props/review-props';

function Review({comment} : ReviewProps) : JSX.Element{
  const reviewDate = new Date(comment.date);
  const reviewDateMonth = MONTHS_NAMES[reviewDate.getMonth()];
  const reviewDateYear = reviewDate.getFullYear();
  const reviewDateDate = reviewDate.getDate();
  const reviewDateString = `${reviewDateMonth} ${reviewDateDate}, ${reviewDateYear}`;

  return (
    <div key={comment.id} className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date">{reviewDateString}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}

export default Review;
