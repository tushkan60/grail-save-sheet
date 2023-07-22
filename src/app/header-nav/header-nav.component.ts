import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth.actions';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private userSub!: Subscription;
  userName: string = '';
  isAuthenticated = false;

  localeList = [
    { code: 'en-US', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authData) => {
          return authData.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        if (user) {
          this.userName = user.email;
        }
      });
  }

  constructor(private store: Store<fromApp.AppState>) {}

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
