import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameStateService } from './game-state.service';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { GameOverPopupComponent } from './game-over-popup/game-over-popup.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, ScoreBoardComponent, GameOverPopupComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
