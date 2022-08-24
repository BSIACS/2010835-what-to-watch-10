import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import PrivateRouteProps from '../../types/props/private-route-props';

function PrivateRoute({ children } : PrivateRouteProps){
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.SignIn}/>;
}

export default PrivateRoute;
