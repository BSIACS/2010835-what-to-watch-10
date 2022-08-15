import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import PrivateRouteProps from '../../types/props/private-route-props';

function PrivateRoute({ children } : PrivateRouteProps){
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.SignIn}/>;
}

export default PrivateRoute;
