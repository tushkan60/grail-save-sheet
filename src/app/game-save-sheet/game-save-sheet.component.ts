import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveSheet } from './save-sheet.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { storeSaveSheet, updateSaveSheet } from '../store/game.action';
import { map } from 'rxjs/operators';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-save-sheet',
  templateUrl: './game-save-sheet.component.html',
  styleUrls: ['./game-save-sheet.component.css'],
})
export class GameSaveSheetComponent implements OnInit, OnDestroy {
  saveSheetForm!: FormGroup;
  subscription!: Subscription;
  gameName: string = 'New Game';
  gameId: string = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.saveSheetForm = new FormGroup({
      gameName: new FormControl(this.gameName, Validators.required),
      menhirs: new FormGroup({
        firstMenhir: this.createFormGroup(),
        secondMenhir: this.createFormGroup(),
        thirdMenhir: this.createFormGroup(),
      }),
      missions: new FormGroup({
        firstMission: this.createFormGroup(),
        secondMission: this.createFormGroup(),
      }),
      guardians: new FormGroup({
        firstGuardian: new FormControl(null),
        secondGuardian: new FormControl(null),
      }),
      notes: new FormControl(null),
    });

    this.subscription = combineLatest([
      this.store
        .select('saveSheet')
        .pipe(map((saveSheetState) => saveSheetState.saveSheet)),
      this.store
        .select('saveSheet')
        .pipe(map((saveSheetState) => saveSheetState.id)),
    ]).subscribe(([saveSheet, id]) => {
      if (saveSheet) {
        this.saveSheetForm.patchValue(saveSheet);
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

    const saveSheet: SaveSheet = this.saveSheetForm.value;
    this.store.dispatch(storeSaveSheet({ saveSheet, lastChange: new Date() }));
  }

  onUpdate() {
    const saveSheet: SaveSheet = this.saveSheetForm.value;
    this.store.dispatch(
      updateSaveSheet({ id: this.gameId, saveSheet, lastChange: new Date() })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createFormGroup() {
    return new FormGroup({
      location: new FormControl(null),
      dialValue: new FormControl(null),
    });
  }
}
