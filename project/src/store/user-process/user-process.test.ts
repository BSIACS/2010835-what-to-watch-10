import { AuthorizationStatus } from '../../constants';
import { UserProcess } from '../../types/state';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthorizationAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

let initialStateMock : UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData : null,
};

describe('Reducer: UserProcess', () => {
  it('without parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialStateMock);
  });

  initialStateMock = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData : null,
  };

  describe('checkAuthorizationAction test', () => {
    const userData = makeFakeUserData();

    it('should update "authorizationStatus" to "AUTH" if checkAuthorizationAction fulfilled', () => {
      expect(userProcess.reducer(initialStateMock, { type: checkAuthorizationAction.fulfilled.type, payload: userData }))
        .toEqual({ userData : userData, authorizationStatus: AuthorizationStatus.Auth });
    });

    it('should update "authorizationStatus" to "NO_AUTH" and "userData" to null if checkAuthorizationAction rejected', () => {
      expect(userProcess.reducer(initialStateMock, {type: checkAuthorizationAction.rejected.type}))
        .toEqual({ userData : null, authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('loginAction test', () => {
    const userData = makeFakeUserData();

    it('should update "authorizationStatus" to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(initialStateMock, { type: loginAction.fulfilled.type, payload: userData }))
        .toEqual({ userData : userData, authorizationStatus: AuthorizationStatus.Auth });
    });

    it('should update "authorizationStatus" to "NO_AUTH" and "userData" to null if loginAction rejected', () => {
      expect(userProcess.reducer(initialStateMock, {type: loginAction.rejected.type}))
        .toEqual({ userData : null, authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('logoutAction test', () => {
    it('should update "authorizationStatus" to "NO_AUTH" and "userData" to null if logoutAction fulfilled', () => {
      expect(userProcess.reducer(initialStateMock, { type: logoutAction.fulfilled.type }))
        .toEqual({ userData : null, authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });
});
