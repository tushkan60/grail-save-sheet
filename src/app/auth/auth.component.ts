import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { loginStart, signupStart } from '../store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  hide = true;
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  private storeSub!: Subscription;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.isLoading;
      this.error = authState.authError;
      if (this.error) {
        this.isLoading = false;
      }
    });
  }

  getEmailErrorMessage() {
    if (this.authForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.authForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.authForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.authForm.controls.password.hasError('minlength')
      ? 'Password is too short'
      : '';
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const email = this.authForm.controls.email.value;
    const password = this.authForm.controls.password.value;

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(signupStart({ email: email, password: password }));
    }
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
