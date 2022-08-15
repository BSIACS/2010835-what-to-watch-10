import { Link } from 'react-router-dom';
import { AppLink, AppRoute, AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function UserBlock() : JSX.Element{
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  if(authorizationStatus !== AuthorizationStatus.Auth || user === null){
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
        </li>
      </ul>
    );
  }

  const logoutClickHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={`/${AppLink.Mylist}`}>
          <div className="user-block__avatar">
            <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <span className="user-block__link" onClick={logoutClickHandler}>Sign out</span>
      </li>
    </ul>
  );
}

export default UserBlock;
