import { SaveSheet } from '../game-save-sheet/save-sheet.model';
import { createReducer, on } from '@ngrx/store';
import * as gameActions from './game.action';
import { PlayerSheet } from '../game-players-sheet/player-sheet.model';
import { AchievementsSheet } from '../game-achievements-sheet/achievements-sheet.model';

export interface State {
  id: string | null;
  loadError: string | null;
  isLoading: boolean;
  lastChange: Date | null;
  saveSheet: SaveSheet | null;
  playersSheet: {
    playerOne: PlayerSheet;
    playerTwo: PlayerSheet;
    playerThree: PlayerSheet;
    playerFour: PlayerSheet;
  } | null;
  achievementsSheet: AchievementsSheet | null;
  locationsSheet: { oldLocation: number; newLocation: number }[] | null;
  gamesList: { gameName: string; gameKey: string; lastChange: Date }[] | null;
}

const initialState: State = {
  id: null,
  loadError: null,
  isLoading: false,
  lastChange: null,
  saveSheet: null,
  playersSheet: null,
  achievementsSheet: null,
  locationsSheet: null,
  gamesList: null,
};

export const gameReducer = createReducer(
  initialState,
  on(
    gameActions.storeSaveSheet,
    gameActions.updateSaveSheet,
    (state, action) => ({
      ...state,
      saveSheet: action.saveSheet,
      lastChange: action.lastChange,
    })
  ),
  on(
    gameActions.storePlayersSheet,
    gameActions.updatePlayersSheet,
    (state, action) => ({
      ...state,
      playersSheet: action.playersSheet,
      lastChange: action.lastChange,
    })
  ),
  on(
    gameActions.storeAchievementsSheet,
    gameActions.updateAchievementsSheet,
    (state, action) => ({
      ...state,
      achievementsSheet: action.achievementsSheet,
      lastChange: action.lastChange,
    })
  ),
  on(
    gameActions.storeLocationSheet,
    gameActions.updateLocationSheet,
    (state, action) => ({
      ...state,
      locationsSheet: action.locationsSheet,
      lastChange: action.lastChange,
    })
  ),
  on(gameActions.storeSuccess, (state, action) => ({
    ...state,
    id: action.id,
  })),
  on(
    gameActions.startLoadingGamesList,
    gameActions.startLoadingGame,
    (state) => ({
      ...state,
      isLoading: true,
      loadError: null,
    })
  ),
  on(gameActions.loadingGamesListSuccess, (state, action) => ({
    ...state,
    gamesList: action.gamesList,
    loadError: null,
    isLoading: false,
  })),
  on(gameActions.loadingGamesListFail, (state, action) => ({
    ...state,
    gamesList: null,
    loadError: action.message,
    isLoading: false,
  })),
  on(gameActions.clearError, (state) => ({ ...state, loadError: null })),
  on(gameActions.loadingGameSuccess, (state, action) => ({
    ...state,
    id: action.state.id,
    saveSheet: action.state.saveSheet,
    playersSheet: action.state.playersSheet,
    achievementsSheet: action.state.achievementsSheet,
    locationsSheet: action.state.locationsSheet,
    loadError: null,
    isLoading: false,
  })),
  on(gameActions.loadingGameFail, (state, action) => ({
    ...state,
    id: null,
    saveSheet: null,
    playersSheet: null,
    achievementsSheet: null,
    locationsSheet: null,
    loadError: action.message,
    isLoading: false,
  })),
  on(gameActions.clearState, (state) => ({
    ...state,
    id: null,
    saveSheet: null,
    playersSheet: null,
    achievementsSheet: null,
    locationsSheet: null,
    loadError: null,
    isLoading: false,
  }))
);
