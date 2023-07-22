import * as fromAuth from '../store/auth.reducer';
import * as fromSaveSheet from './game.reducer';
import { ActionReducerMap } from '@ngrx/store';
export interface AppState {
  auth: fromAuth.State;
  saveSheet: fromSaveSheet.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  saveSheet: fromSaveSheet.gameReducer,
};
