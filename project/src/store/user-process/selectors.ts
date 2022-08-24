import { AuthorizationStatus, NameSpace } from '../../constants';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';


export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authorizationStatus;
export const getUserData = (state: State): UserData => state[NameSpace.UserProcess].userData;
