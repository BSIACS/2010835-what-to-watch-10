import { Link } from 'react-router-dom';
import { AppLink } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { resetFilmsToShowQuantity, resetFilterSelectedGenre } from '../../store/action';

function Logo() : JSX.Element {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(resetFilmsToShowQuantity());
    dispatch(resetFilterSelectedGenre());
  };

  return (
    <div className="logo">
      <Link to={AppLink.Root} className="logo__link" onClick={onClickHandler}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
