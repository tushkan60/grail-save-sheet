import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
  '[auth] Login Start',
  props<{ email: string | null; password: string | null }>()
);

export const signupStart = createAction(
  '[auth] Signup Start',
  props<{ email: string | null; password: string | null }>()
);

export const authSuccess = createAction(
  '[auth] Auth Success',
  props<{
    user: { email: string; id: string; token: string; expirationDate: Date };
  }>()
);

export const authFail = createAction(
  '[auth] Auth Fail',
  props<{ message: string }>()
);

export const logout = createAction('[auth] Logout');
export const clearError = createAction('[auth] Clear Error');
export const authAutoLogin = createAction('[auth] Auth Auto Login');
