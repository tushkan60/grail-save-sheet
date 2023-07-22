import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { storeLocationSheet, updateLocationSheet } from '../store/game.action';

@Component({
  selector: 'app-games-location-sheet',
  templateUrl: './games-location-sheet.component.html',
  styleUrls: ['./games-location-sheet.component.css'],
})
export class GamesLocationSheetComponent implements OnInit, OnDestroy {
  locationSheetForm!: FormGroup;
  subscription!: Subscription;
  idSubscription!: Subscription;
  gameId: string = '';

  ngOnInit() {
    this.initForm();
    this.idSubscription = this.store
      .select('saveSheet')
      .pipe(map((achievementsSheet) => achievementsSheet.id))
      .subscribe((id) => {
        if (id) {
          this.gameId = id;
        }
      });

    this.subscription = this.store
      .select('saveSheet')
      .pipe(
        map((locationState) => locationState.locationsSheet),
        take(1)
      )
      .subscribe((locationsSheet) => {
        if (locationsSheet) {
          console.log(locationsSheet);
          const locationsFormArray = this.locationSheetForm.get(
            'locationsSheet'
          ) as FormArray;
          for (let location of locationsSheet) {
            locationsFormArray.push(
              new FormGroup({
                oldLocation: new FormControl(location.oldLocation),
                newLocation: new FormControl(location.newLocation),
              })
            );
          }
        }
      });
  }

  constructor(private store: Store<fromApp.AppState>) {}

  get controls() {
    return (this.locationSheetForm.get('locationsSheet') as FormArray).controls;
  }

  onSave() {
    if (this.gameId !== '' && !confirm('Are you sure?')) {
      return;
    }
    const locationsSheet: { oldLocation: number; newLocation: number }[] =
      this.locationSheetForm.value.locationsSheet;
    this.store.dispatch(
      storeLocationSheet({
        locationsSheet: locationsSheet,
        lastChange: new Date(),
      })
    );
  }

  onUpdate() {
    const locationsSheet: { oldLocation: number; newLocation: number }[] =
      this.locationSheetForm.value.locationsSheet;
    this.store.dispatch(
      updateLocationSheet({
        id: this.gameId,
        locationsSheet,
        lastChange: new Date(),
      })
    );
  }

  onAddLocation() {
    const locationsFormArray = this.locationSheetForm.get(
      'locationsSheet'
    ) as FormArray;
    locationsFormArray.push(
      new FormGroup({
        oldLocation: new FormControl(null),
        newLocation: new FormControl(null),
      })
    );
  }

  onDeleteLocation(i: number) {
    const locationsFormArray = this.locationSheetForm.get(
      'locationsSheet'
    ) as FormArray;

    locationsFormArray.removeAt(i);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.idSubscription.unsubscribe();
  }

  private initForm() {
    let locationsFormArray = new FormArray([]);
    this.locationSheetForm = new FormGroup({
      locationsSheet: locationsFormArray,
    });
  }
}
