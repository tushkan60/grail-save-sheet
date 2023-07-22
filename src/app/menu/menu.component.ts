import { Component } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { clearState } from '../store/game.action';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private store: Store<fromApp.AppState>) {}

  onClear() {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.store.dispatch(clearState());
  }
}
