import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './auth/auth.guard';
import { GameSaveSheetComponent } from './game-save-sheet/game-save-sheet.component';
import { GamePlayersSheetComponent } from './game-players-sheet/game-players-sheet.component';
import { GameAchievementsSheetComponent } from './game-achievements-sheet/game-achievements-sheet.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesLocationSheetComponent } from './games-location-sheet/games-location-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'list',
    component: GamesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'save',
    component: GameSaveSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'players',
    component: GamePlayersSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'achievements',
    component: GameAchievementsSheetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'location',
    component: GamesLocationSheetComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
