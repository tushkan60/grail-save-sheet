import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  storeAchievementsSheet,
  updateAchievementsSheet,
} from '../store/game.action';
import { AchievementsSheet } from './achievements-sheet.model';

@Component({
  selector: 'app-game-achievements-sheet',
  templateUrl: './game-achievements-sheet.component.html',
  styleUrls: ['./game-achievements-sheet.component.css'],
})
export class GameAchievementsSheetComponent implements OnInit, OnDestroy {
  achievementsSheetForm!: FormGroup;
  subscription!: Subscription;
  gameId: string = '';

  formSections: {
    label: string;
    controlName: string;
    formArray?: boolean;
    description?: string;
  }[] = [
    {
      label: $localize`Winds of Wyrdness`,
      controlName: 'windsOfWyrdness',
      formArray: false,
    },
    {
      label: $localize`Reclamation`,
      controlName: 'reclamation',
      formArray: false,
    },
    {
      label: $localize`War for Avalon`,
      controlName: 'warForAvalon',
      formArray: true,
    },
    {
      label: $localize`Restoring The Order`,
      controlName: 'restoringTheOrder',
      formArray: true,
      description: $localize`When you have any six parts of this status, go to BoS, Verse 512`,
    },
    {
      label: $localize`Enemies Of Avalon`,
      controlName: 'enemiesOfAvalon',
      formArray: true,
    },
    { label: $localize`Remnants`, controlName: 'remnants', formArray: true },
    {
      label: $localize`Deep Secret`,
      controlName: 'deepSecret',
      formArray: false,
    },

    {
      label: $localize`Disturbing Information`,
      controlName: 'disturbingInformation',
      formArray: true,
    },
    {
      label: $localize`Dreams And Prophecies`,
      controlName: 'dreamsAndProphecies',
      formArray: true,
    },
    { label: $localize`Diplomat`, controlName: 'diplomat', formArray: true },
    {
      label: $localize`Diplomatic Mission`,
      controlName: 'diplomaticMission',
      formArray: true,
    },
    {
      label: $localize`Hunters Mark`,
      controlName: 'huntersMark',
      formArray: false,
    },
    {
      label: $localize`Charred Knowledge`,
      controlName: 'charredKnowledge',
      formArray: false,
    },
    {
      label: $localize`Farpoint Clues`,
      controlName: 'farpointClues',
      formArray: true,
    },
    {
      label: $localize`Fall Of Chivalry`,
      controlName: 'fallOfChivalry',
      formArray: true,
      description: $localize`When you have any six parts of this status, go to BoS, Verse 525`,
    },
    {
      label: $localize`Shrine Secure`,
      controlName: 'shrineSecure',
      formArray: false,
    },
    {
      label: $localize`Peoples Champion`,
      controlName: 'peoplesChampion',
      formArray: false,
    },
    { label: $localize`Scrounger`, controlName: 'scrounger', formArray: false },
    {
      label: $localize`Halfway Intrigue`,
      controlName: 'halfwayIntrigue',
      formArray: true,
    },
    {
      label: $localize`Redemption`,
      controlName: 'redemption',
      formArray: true,
    },
    {
      label: $localize`Maggots Redemption`,
      controlName: 'maggotsRedemption',
      formArray: false,
    },
    {
      label: $localize`Tuathan Exploration`,
      controlName: 'tuathanExploration',
      formArray: true,
    },
    {
      label: $localize`Hidden Treasures`,
      controlName: 'hiddenTreasures',
      formArray: true,
    },
    {
      label: $localize`End Of The Road`,
      controlName: 'endOfTheRoad',
      formArray: false,
    },
    { label: $localize`Cosuil`, controlName: 'cosuil', formArray: true },
    {
      label: $localize`Traveling Menhir`,
      controlName: 'travelingMenhir',
      formArray: true,
    },
    { label: $localize`Matricide`, controlName: 'matricide', formArray: false },
    {
      label: $localize`Peace In Borough`,
      controlName: 'peaceInBorough',
      formArray: false,
    },
    {
      label: $localize`Moonring Mission`,
      controlName: 'moonringMission',
      formArray: false,
    },
    {
      label: $localize`Monastery Discovered`,
      controlName: 'monasteryDiscovered',
      formArray: false,
    },
    {
      label: $localize`Deal Breaker`,
      controlName: 'dealBreaker',
      formArray: false,
    },
    {
      label: $localize`Faels Legacy`,
      controlName: 'faelsLegacy',
      formArray: false,
    },
    {
      label: $localize`Burning Mystery`,
      controlName: 'burningMystery',
      formArray: true,
    },
    {
      label: $localize`General Directions`,
      controlName: 'generalDirections',
      formArray: false,
    },
    { label: $localize`Cold Pyre`, controlName: 'coldPyre', formArray: false },
    {
      label: $localize`Lost And Fallen`,
      controlName: 'lostAndFallen',
      formArray: true,
    },
    {
      label: $localize`Mourning Song`,
      controlName: 'mourningSong',
      formArray: true,
    },
    {
      label: $localize`Something Is Watching`,
      controlName: 'somethingIsWatching',
      formArray: true,
      description: $localize`When you have all 4 parts of this status, play special event V`,
    },
    {
      label: $localize`Supplying The Revolt`,
      controlName: 'supplyingTheRevolt',
      formArray: true,
    },
    { label: $localize`Underfern`, controlName: 'underfern', formArray: true },
    {
      label: $localize`Pathfinder`,
      controlName: 'pathfinder',
      formArray: true,
    },
    {
      label: $localize`LeftBehind`,
      controlName: 'leftBehind',
      formArray: true,
    },
    {
      label: $localize`Helping The Knights`,
      controlName: 'helpingTheKnights',
      formArray: true,
    },
    {
      label: $localize`Tangleroot Knowledge`,
      controlName: 'tanglerootKnowledge',
      formArray: true,
    },
    {
      label: $localize`Ladys Task`,
      controlName: 'ladysTask',
      formArray: false,
    },
    {
      label: $localize`Morgaines Task`,
      controlName: 'morgainesTask',
      formArray: false,
    },
    {
      label: $localize`Final Confrontations`,
      controlName: 'finalConfrontations',
      formArray: true,
    },
    {
      label: $localize`Final Lesson`,
      controlName: 'finalLesson',
      formArray: true,
    },
    { label: $localize`Last Haven`, controlName: 'lastHaven', formArray: true },
    {
      label: $localize`Call From Beyond`,
      controlName: 'callFromBeyond',
      formArray: false,
    },
    {
      label: $localize`Guest Of Honor`,
      controlName: 'guestOfHonor',
      formArray: false,
    },
    {
      label: $localize`Gerraints Successor`,
      controlName: 'gerraintsSuccessor',
      formArray: true,
    },
    {
      label: $localize`Shelter In The Storm`,
      controlName: 'shelterInTheStorm',
      formArray: false,
    },
    {
      label: $localize`Cherished Belongings`,
      controlName: 'cherishedBelongings',
      formArray: false,
    },
    {
      label: $localize`Mystery Solved`,
      controlName: 'mysterySolved',
      formArray: false,
    },
    {
      label: $localize`Glen Ritual`,
      controlName: 'glenRitual',
      formArray: true,
    },
    {
      label: $localize`Helping Hand`,
      controlName: 'helpingHand',
      formArray: true,
    },
    {
      label: $localize`Stonemasons Secret`,
      controlName: 'stonemasonsSecret',
      formArray: false,
    },
    {
      label: $localize`Riddle Of The Old Steel`,
      controlName: 'riddleOfTheOldSteel',
      formArray: false,
    },
    { label: $localize`Tracker`, controlName: 'tracker', formArray: false },
    { label: $localize`Remedy`, controlName: 'remedy', formArray: true },
    {
      label: $localize`Allies Of Avalon`,
      controlName: 'alliesOfAvalon',
      formArray: true,
    },
    {
      label: $localize`Saved By The Goddess`,
      controlName: 'savedByTheGoddess',
      formArray: false,
    },
    { label: $localize`Pillager`, controlName: 'pillager', formArray: true },
    {
      label: $localize`Strange Encounters`,
      controlName: 'strangeEncounters',
      formArray: true,
    },
    {
      label: $localize`Fate Of The Expedition`,
      controlName: 'fateOfTheExpedition',
      formArray: true,
      description: $localize`When you have parts 1-8 of this status, go to BoS, Verse 405`,
    },
    {
      label: $localize`Secrets Of The Forest`,
      controlName: 'secretsOfTheForest',
      formArray: true,
    },
    {
      label: $localize`Fortunate Meetings`,
      controlName: 'fortunateMeetings',
      formArray: true,
    },
    {
      label: $localize`Black Cauldron`,
      controlName: 'blackCauldron',
      formArray: true,
    },
    {
      label: $localize`Escalation`,
      controlName: 'escalation',
      formArray: true,
    },
  ];

  ngOnInit() {
    this.achievementsSheetForm = this.createAchievementsSheetForm();

    this.subscription = combineLatest([
      this.store
        .select('saveSheet')
        .pipe(map((achievementsState) => achievementsState.achievementsSheet)),
      this.store
        .select('saveSheet')
        .pipe(map((achievementsSheet) => achievementsSheet.id)),
    ]).subscribe(([achievementsSheet, id]) => {
      if (achievementsSheet) {
        console.log(achievementsSheet);
        this.achievementsSheetForm.patchValue(achievementsSheet);
      }
      if (id) {
        this.gameId = id;
      }
    });
  }

  constructor(private store: Store<fromApp.AppState>) {}

  onSave() {
    if (this.gameId !== '' && !confirm('Are you sure?')) {
      return;
    }
    const achievementsSheet: AchievementsSheet =
      this.achievementsSheetForm.value;
    this.store.dispatch(
      storeAchievementsSheet({ achievementsSheet, lastChange: new Date() })
    );
  }

  onUpdate() {
    const achievementsSheet: AchievementsSheet =
      this.achievementsSheetForm.value;
    this.store.dispatch(
      updateAchievementsSheet({
        id: this.gameId,
        achievementsSheet,
        lastChange: new Date(),
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getControls(formArrayName: string) {
    return (this.achievementsSheetForm.get(formArrayName) as FormArray)
      .controls as FormControl[];
  }

  createFormArray(i: number) {
    return new FormArray(
      Array.from({ length: i }, () => new FormControl(false))
    );
  }

  createAchievementsSheetForm() {
    return new FormGroup({
      windsOfWyrdness: new FormControl(false),
      reclamation: new FormControl(false),
      warForAvalon: this.createFormArray(4),
      restoringTheOrder: this.createFormArray(8),
      enemiesOfAvalon: this.createFormArray(3),
      remnants: this.createFormArray(5),
      deepSecret: new FormControl(false),
      disturbingInformation: this.createFormArray(3),
      dreamsAndProphecies: this.createFormArray(8),
      diplomat: this.createFormArray(3),
      diplomaticMission: this.createFormArray(6),
      huntersMark: new FormControl(false),
      charredKnowledge: new FormControl(false),
      farpointClues: this.createFormArray(5),
      fallOfChivalry: this.createFormArray(8),
      shrineSecure: new FormControl(false),
      peoplesChampion: new FormControl(false),
      scrounger: new FormControl(false),
      halfwayIntrigue: this.createFormArray(3),
      redemption: this.createFormArray(5),
      maggotsRedemption: new FormControl(false),
      tuathanExploration: this.createFormArray(5),
      hiddenTreasures: this.createFormArray(8),
      endOfTheRoad: new FormControl(false),
      cosuil: this.createFormArray(5),
      travelingMenhir: this.createFormArray(2),
      matricide: new FormControl(false),
      peaceInBorough: new FormControl(false),
      moonringMission: new FormControl(false),
      monasteryDiscovered: new FormControl(false),
      dealBreaker: new FormControl(false),
      faelsLegacy: new FormControl(false),
      burningMystery: this.createFormArray(9),
      generalDirections: new FormControl(false),
      coldPyre: new FormControl(false),
      lostAndFallen: this.createFormArray(7),
      mourningSong: this.createFormArray(2),
      somethingIsWatching: this.createFormArray(4),
      supplyingTheRevolt: this.createFormArray(4),
      underfern: this.createFormArray(5),
      pathfinder: this.createFormArray(8),
      leftBehind: this.createFormArray(9),
      helpingTheKnights: this.createFormArray(4),
      tanglerootKnowledge: this.createFormArray(2),
      ladysTask: new FormControl(false),
      morgainesTask: new FormControl(false),
      finalConfrontations: this.createFormArray(7),
      finalLesson: this.createFormArray(5),
      lastHaven: this.createFormArray(5),
      callFromBeyond: new FormControl(false),
      guestOfHonor: new FormControl(false),
      gerraintsSuccessor: this.createFormArray(3),
      shelterInTheStorm: new FormControl(false),
      cherishedBelongings: new FormControl(false),
      mysterySolved: new FormControl(false),
      glenRitual: this.createFormArray(2),
      helpingHand: this.createFormArray(6),
      stonemasonsSecret: new FormControl(false),
      riddleOfTheOldSteel: new FormControl(false),
      tracker: new FormControl(false),
      remedy: this.createFormArray(4),
      alliesOfAvalon: this.createFormArray(5),
      savedByTheGoddess: new FormControl(false),
      pillager: this.createFormArray(5),
      strangeEncounters: this.createFormArray(8),
      fateOfTheExpedition: this.createFormArray(9),
      secretsOfTheForest: this.createFormArray(4),
      fortunateMeetings: this.createFormArray(5),
      blackCauldron: this.createFormArray(3),
      escalation: this.createFormArray(3),
    });
  }
}
