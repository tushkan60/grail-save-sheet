import { Component, OnInit } from '@angular/core';
import * as fromApp from '../app/store/app.reducer';
import { Store } from '@ngrx/store';
import { authAutoLogin } from './store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.store.dispatch(authAutoLogin());
  }
  constructor(private store: Store<fromApp.AppState>) {}
}
