import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import {
  clearError,
  startLoadingGame,
  startLoadingGamesList,
} from '../store/game.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  gamesList!: { gameName: string; gameKey: string; lastChange: Date }[] | null;
  isLoading = false;
  error: string | null = null;

  onLoadList() {
    this.store.dispatch(startLoadingGamesList());
  }

  onLoadGame(id: string) {
    this.store.dispatch(startLoadingGame({ id }));
  }

  onClearError() {
    this.store.dispatch(clearError());
  }

  ngOnInit() {
    this.subscription = this.store
      .select('saveSheet')
      .subscribe((gameListState) => {
        this.gamesList = gameListState.gamesList;
        this.isLoading = gameListState.isLoading;
        this.error = gameListState.loadError;
      });
  }

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
