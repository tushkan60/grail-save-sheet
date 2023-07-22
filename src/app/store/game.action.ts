import { createAction, props } from '@ngrx/store';
import { SaveSheet } from '../game-save-sheet/save-sheet.model';
import { PlayerSheet } from '../game-players-sheet/player-sheet.model';
import { AchievementsSheet } from '../game-achievements-sheet/achievements-sheet.model';
import { State } from './game.reducer';

export const storeSaveSheet = createAction(
  '[saveSheet] Store Save Sheet',
  props<{ saveSheet: SaveSheet; lastChange: Date }>()
);

export const updateSaveSheet = createAction(
  '[saveSheet] Update Save Sheet',
  props<{ id: string; saveSheet: SaveSheet; lastChange: Date }>()
);

export const storePlayersSheet = createAction(
  '[saveSheet] Store Players Sheet',
  props<{
    playersSheet: {
      playerOne: PlayerSheet;
      playerTwo: PlayerSheet;
      playerThree: PlayerSheet;
      playerFour: PlayerSheet;
    };
    lastChange: Date;
  }>()
);

export const updatePlayersSheet = createAction(
  '[saveSheet] Update Players Sheet',
  props<{
    id: string;
    playersSheet: {
      playerOne: PlayerSheet;
      playerTwo: PlayerSheet;
      playerThree: PlayerSheet;
      playerFour: PlayerSheet;
    };
    lastChange: Date;
  }>()
);

export const storeAchievementsSheet = createAction(
  '[saveSheet] Store Achievements Sheet',
  props<{ achievementsSheet: AchievementsSheet; lastChange: Date }>()
);

export const updateAchievementsSheet = createAction(
  '[saveSheet] Update Achievements Sheet',
  props<{
    id: string;
    achievementsSheet: AchievementsSheet;
    lastChange: Date;
  }>()
);

export const storeLocationSheet = createAction(
  '[saveSheet] Store Location Sheet',
  props<{
    locationsSheet: { oldLocation: number; newLocation: number }[];
    lastChange: Date;
  }>()
);

export const updateLocationSheet = createAction(
  '[saveSheet] Update Location Sheet',
  props<{
    id: string;
    locationsSheet: { oldLocation: number; newLocation: number }[];
    lastChange: Date;
  }>()
);

export const startLoadingGamesList = createAction(
  '[saveSheet] Start Loading Games List'
);

export const loadingGamesListSuccess = createAction(
  '[saveSheet] Loading Games List Success',
  props<{
    gamesList: { gameName: string; gameKey: string; lastChange: Date }[];
  }>()
);

export const loadingGamesListFail = createAction(
  '[saveSheet] Loading Games List Fail',
  props<{ message: string }>()
);

export const clearError = createAction('[auth] Clear Error');

export const storeSuccess = createAction(
  '[saveSheet] Store Success',
  props<{ id: string }>()
);

export const startLoadingGame = createAction(
  '[saveSheet] Start Loading Game',
  props<{ id: string }>()
);

export const loadingGameSuccess = createAction(
  '[saveSheet] Loading Game Success',
  props<{
    state: State;
  }>()
);

export const loadingGameFail = createAction(
  '[saveSheet] Loading Game Fail',
  props<{ message: string }>()
);

export const clearState = createAction('[saveSheet] Clear State');
