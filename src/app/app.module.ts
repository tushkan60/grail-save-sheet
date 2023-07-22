import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './store/auth.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { GameSaveSheetComponent } from './game-save-sheet/game-save-sheet.component';
import { MatSelectModule } from '@angular/material/select';
import { GamePlayersSheetComponent } from './game-players-sheet/game-players-sheet.component';
import { GameAchievementsSheetComponent } from './game-achievements-sheet/game-achievements-sheet.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesLocationSheetComponent } from './games-location-sheet/games-location-sheet.component';
import { GameEffects } from './store/game.effects';
import { SaveButtonsComponent } from './shared/save-buttons/save-buttons.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderNavComponent,
    MenuComponent,
    GameSaveSheetComponent,
    GamePlayersSheetComponent,
    GameAchievementsSheetComponent,
    GamesListComponent,
    GamesLocationSheetComponent,
    SaveButtonsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects, GameEffects]),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgbModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
