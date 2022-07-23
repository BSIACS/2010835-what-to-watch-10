import React from 'react';
import RatingStarProps from '../../../types/props/rating-star-props';

function RatingStar({fieldChangeHandler, elementNumber, rating} : RatingStarProps) : JSX.Element{
  const id = `star-${elementNumber}`;
  const isChecked = rating === elementNumber;

  return (
    <React.Fragment>
      <input className="rating__input" id={id} type="radio" name="rating" value={elementNumber} onChange={fieldChangeHandler} defaultChecked={isChecked}/>
      <label className="rating__label" htmlFor={id}>Rating {rating}</label>
    </React.Fragment>
  );
}

export default RatingStar;
