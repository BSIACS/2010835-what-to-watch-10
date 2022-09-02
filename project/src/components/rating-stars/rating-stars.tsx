import { FilmRatingSettings } from '../../constants';
import RatingStarsProps from '../../types/props/rating-stars-props';
import RatingStar from './rating-star/rating-star';

function RatingStars({handleFieldChange, rating, isDisabled} : RatingStarsProps) : JSX.Element{

  const stars = (new Array(FilmRatingSettings.MaxFilmRating)).fill(1).map((a,i)=> ++i).reverse();

  return (
    <div className="rating">
      <div className="rating__stars" >
        {stars.map((element) => <RatingStar key={element} handleFieldChange={handleFieldChange} elementNumber={element} rating={rating} isDisabled={isDisabled}/>)}
      </div>
    </div>
  );
}

export default RatingStars;
