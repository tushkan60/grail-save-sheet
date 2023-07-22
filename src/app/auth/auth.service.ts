import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
