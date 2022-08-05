import React from 'react';
import ReviewTabProps from '../../../types/props/review-tab-props';
import Review from './review/review';


function Reviews({comments} : ReviewTabProps) : JSX.Element{

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment, index) => index % 2 === 0 ? <Review key={comment.id} comment={comment}/> : '')}
      </div>
      <div className="film-card__reviews-col">
        {comments.map((comment, index) => index % 2 !== 0 ? <Review key={comment.id} comment={comment}/> : '')}
      </div>
    </div>
  );
}

export default Reviews;
