import React from 'react';
import OverviewTabProps from '../../../types/props/overview-tab-props';
import { getRatingLevel } from '../../../utils';


function Overview({film} : OverviewTabProps) : JSX.Element{
  const ratingLevel = film?.rating ? getRatingLevel(film.rating) : '';

  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingLevel}</span>
          <span className="film-rating__count">{film?.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {film?.description}

        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film?.starring.join(', ')}</strong></p>
      </div>
    </React.Fragment>
  );
}

export default Overview;
