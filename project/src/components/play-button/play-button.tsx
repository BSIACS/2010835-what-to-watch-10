import { Link } from 'react-router-dom';
import { AppLink } from '../../constants';
import PlayButtonProps from '../../types/props/play-button-props';

function PlayButton({ filmId } : PlayButtonProps) : JSX.Element{

  return (
    <button className="btn btn--play film-card__button" type="button">
      <Link className='play-link' to={`/${AppLink.Player}/${filmId}`}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
    </button>
  );
}

export default PlayButton;
