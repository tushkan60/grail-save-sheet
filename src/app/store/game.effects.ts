import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadingGameFail,
  loadingGamesListFail,
  loadingGamesListSuccess,
  loadingGameSuccess,
  startLoadingGame,
  startLoadingGamesList,
  storeAchievementsSheet,
  storeLocationSheet,
  storePlayersSheet,
  storeSaveSheet,
  storeSuccess,
  updateAchievementsSheet,
  updateLocationSheet,
  updatePlayersSheet,
  updateSaveSheet,
} from './game.action';
import { catchError, EMPTY, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveSheet } from '../game-save-sheet/save-sheet.model';
import { PlayerSheet } from '../game-players-sheet/player-sheet.model';
import { AchievementsSheet } from '../game-achievements-sheet/achievements-sheet.model';
import { State } from './game.reducer';
import { Router } from '@angular/router';

interface DataObject {
  [key: string]: {
    lastChange: Date;
    saveSheet: SaveSheet;
    playersSheet: {
      playerOne: PlayerSheet;
      playerTwo: PlayerSheet;
      playerThree: PlayerSheet;
      playerFour: PlayerSheet;
    };
    achievementsSheet: AchievementsSheet;
    locationsSheet: { oldLocation: number; newLocation: number }[];
  };
}

@Injectable()
export class GameEffects {
  storeSaveSheet = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          storeSaveSheet,
          storePlayersSheet,
          storeAchievementsSheet,
          storeLocationSheet
        ),
        withLatestFrom(
          this.store.select('saveSheet'),
          this.store.select('auth')
        ),
        switchMap(([actionData, saveSheetState, authState]) => {
          let defaultName = saveSheetState.saveSheet?.gameName;
          if (!saveSheetState.saveSheet?.gameName) {
            defaultName = 'New Game';
          }
          const sheetData =
            actionData.type === '[saveSheet] Store Save Sheet'
              ? {
                  saveSheet: actionData.saveSheet,
                  lastChange: actionData.lastChange,
                }
              : actionData.type === '[saveSheet] Store Players Sheet'
              ? {
                  playersSheet: actionData.playersSheet,
                  lastChange: actionData.lastChange,
                  saveSheet: { gameName: defaultName },
                }
              : actionData.type === '[saveSheet] Store Achievements Sheet'
              ? {
                  achievementsSheet: actionData.achievementsSheet,
                  lastChange: actionData.lastChange,
                  saveSheet: { gameName: defaultName },
                }
              : actionData.type === '[saveSheet] Store Location Sheet'
              ? {
                  locationsSheet: actionData.locationsSheet,
                  lastChange: actionData.lastChange,
                  saveSheet: { gameName: defaultName },
                }
              : null;

          if (!sheetData) {
            return EMPTY;
          }

          const userId = authState.user?.email;
          if (!userId) {
            return EMPTY;
          }
          const transformedId = userId.replace(/[@.]/g, '');
          return this.http
            .post<{ name: string }>(
              `https://tainted-grail-90eda-default-rtdb.firebaseio.com/users/${transformedId}.json`,
              sheetData
            )
            .pipe(
              tap((resData) => {
                this.store.dispatch(storeSuccess({ id: resData.name }));
                console.log(resData.name);
              })
            );
        })
      ),
    { dispatch: false }
  );

  updateSaveSheet = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateSaveSheet,
          updatePlayersSheet,
          updateAchievementsSheet,
          updateLocationSheet
        ),
        withLatestFrom(
          this.store.select('saveSheet'),
          this.store.select('auth')
        ),
        switchMap(([actionData, saveSheetState, authState]) => {
          const sheetData =
            actionData.type === '[saveSheet] Update Save Sheet'
              ? {
                  saveSheet: actionData.saveSheet,
                  lastChange: actionData.lastChange,
                }
              : actionData.type === '[saveSheet] Update Players Sheet'
              ? {
                  playersSheet: actionData.playersSheet,
                  lastChange: actionData.lastChange,
                }
              : actionData.type === '[saveSheet] Update Achievements Sheet'
              ? {
                  achievementsSheet: actionData.achievementsSheet,
                  lastChange: actionData.lastChange,
                }
              : actionData.type === '[saveSheet] Update Location Sheet' // Add this condition
              ? {
                  locationsSheet: actionData.locationsSheet,
                  lastChange: actionData.lastChange,
                }
              : null;

          if (!sheetData) {
            return EMPTY;
          }

          const userId = authState.user?.email;
          if (!userId) {
            return EMPTY;
          }
          const transformedId = userId.replace(/[@.]/g, '');
          return this.http.patch<{ name: string }>(
            `https://tainted-grail-90eda-default-rtdb.firebaseio.com/users/${transformedId}/${actionData.id}.json`,
            sheetData
          );
        })
      ),
    { dispatch: false }
  );

  loadGamesList = createEffect(() =>
    this.actions$.pipe(
      ofType(startLoadingGamesList),
      withLatestFrom(this.store.select('auth')),
      switchMap(([actionData, authState]) => {
        const userId = authState.user?.email;
        if (!userId) {
          return EMPTY;
        }
        const transformedId = userId.replace(/[@.]/g, '');
        return this.http
          .get<DataObject>(
            `https://tainted-grail-90eda-default-rtdb.firebaseio.com/users/${transformedId}.json`
          )
          .pipe(
            map((resData) => {
              const gamesList = Object.keys(resData).map((key) => ({
                gameName: resData[key].saveSheet.gameName,
                gameKey: key,
                lastChange: resData[key].lastChange,
              }));
              return loadingGamesListSuccess({ gamesList: gamesList });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An Error occurred';
              if (
                errorRes.message ===
                'Cannot convert undefined or null to object'
              ) {
                errorMessage = 'Not found saved games';
                return of(loadingGamesListFail({ message: errorMessage }));
              }
              return of(loadingGamesListFail({ message: errorMessage }));
            })
          );
      })
    )
  );

  loadGame = createEffect(() =>
    this.actions$.pipe(
      ofType(startLoadingGame),
      withLatestFrom(this.store.select('auth')),
      switchMap(([actionData, authState]) => {
        const userId = authState.user?.email;
        if (!userId) {
          return EMPTY;
        }
        const transformedId = userId.replace(/[@.]/g, '');
        return this.http
          .get<State>(
            `https://tainted-grail-90eda-default-rtdb.firebaseio.com/users/${transformedId}/${actionData.id}.json`
          )
          .pipe(
            map((resData) => {
              const gameState = {
                id: actionData.id,
                saveSheet: resData.saveSheet,
                playersSheet: resData.playersSheet,
                achievementsSheet: resData.achievementsSheet,
                loadError: null,
                isLoading: false,
                lastChange: resData.lastChange,
                gamesList: null,
                locationsSheet: resData.locationsSheet,
              };
              return loadingGameSuccess({ state: gameState });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An Error occurred';
              if (!errorRes.error || !errorRes.error.error) {
                return of(loadingGameFail({ message: errorMessage }));
              }
              return of(loadingGameFail({ message: errorMessage }));
            })
          );
      })
    )
  );

  loadGameRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadingGameSuccess),
        tap(() => {
          this.router.navigate(['/save']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}
