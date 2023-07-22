import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { storePlayersSheet, updatePlayersSheet } from '../store/game.action';
import { PlayerSheet } from './player-sheet.model';

@Component({
  selector: 'app-game-players-sheet',
  templateUrl: './game-players-sheet.component.html',
  styleUrls: ['./game-players-sheet.component.css'],
})
export class GamePlayersSheetComponent implements OnInit, OnDestroy {
  playersSheetForm!: FormGroup;
  gameId: string = '';
  subscription!: Subscription;

  playersData = [`Name`, `Location`, `Count`];
  itemsArr = [
    [$localize`Food`, $localize`Gold`],
    [$localize`Rep`, $localize`Exp`, $localize`Magic`],
  ];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.playersSheetForm = new FormGroup({
      playerOne: this.createPlayerFormGroup(),
      playerTwo: this.createPlayerFormGroup(),
      playerThree: this.createPlayerFormGroup(),
      playerFour: this.createPlayerFormGroup(),
    });

    this.subscription = combineLatest([
      this.store
        .select('saveSheet')
        .pipe(map((playersSheetState) => playersSheetState.playersSheet)),
      this.store
        .select('saveSheet')
        .pipe(map((playersSheetState) => playersSheetState.id)),
    ]).subscribe(([playersSheet, id]) => {
      if (playersSheet) {
        this.playersSheetForm.patchValue(playersSheet);
      }
      if (id) {
        this.gameId = id;
      }
    });
  }
  onSave() {
    if (this.gameId !== '' && !confirm('Are you sure?')) {
      return;
    }

    const playersSheet: {
      playerOne: PlayerSheet;
      playerTwo: PlayerSheet;
      playerThree: PlayerSheet;
      playerFour: PlayerSheet;
    } = this.playersSheetForm.value;
    this.store.dispatch(
      storePlayersSheet({ playersSheet, lastChange: new Date() })
    );
  }
  onUpdate() {
    const playersSheet: {
      playerOne: PlayerSheet;
      playerTwo: PlayerSheet;
      playerThree: PlayerSheet;
      playerFour: PlayerSheet;
    } = this.playersSheetForm.value;
    this.store.dispatch(
      updatePlayersSheet({
        id: this.gameId,
        playersSheet,
        lastChange: new Date(),
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createPlayerFormGroup() {
    return new FormGroup({
      playerName: new FormControl(null),
      playerLocation: new FormControl(null),
      playerCount: new FormControl(null),
      playerAggression: new FormControl(null),
      playerEmpathy: new FormControl(null),
      playerCourage: new FormControl(null),
      playerCaution: new FormControl(null),
      playerPracticality: new FormControl(null),
      playerSpirituality: new FormControl(null),
      playerEnergy: new FormControl(null),
      playerHealth: new FormControl(null),
      playerTerror: new FormControl(null),
      playerFood: new FormControl(null),
      playerGold: new FormControl(null),
      playerRep: new FormControl(null),
      playerExp: new FormControl(null),
      playerMagic: new FormControl(null),
    });
  }
}
