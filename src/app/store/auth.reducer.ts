import { User } from '../auth/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  authFail,
  authSuccess,
  clearError,
  loginStart,
  logout,
  signupStart,
} from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  isLoading: boolean;
}

const initialState: State = { user: null, authError: null, isLoading: false };

export const authReducer = createReducer(
  initialState,
  on(loginStart, signupStart, (state) => ({
    ...state,
    authError: null,
    isLoading: true,
  })),
  on(authSuccess, (state, action) => {
    const user = new User(
      action.user.email,
      action.user.id,
      action.user.token,
      action.user.expirationDate
    );
    return { ...state, user: user, authError: null, isLoading: false };
  }),
  on(logout, (state, action) => ({ ...state, user: null, authError: null })),
  on(authFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.message,
    isLoading: false,
  })),
  on(clearError, (state) => ({ ...state, authError: null }))
);
