import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.UserProcess]: userProcess.reducer,
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.AppProcess]: appProcess.reducer,
});
