import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  EMPTY_TILE_COLOR,
  NUM_TILES,
  SNAKE_COLOR,
  SPACING,
  SPACING_COLOR,
  TILE_SIZE,
} from '../constants';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements AfterViewInit {
  constructor(public gameState: GameStateService) {
    let drawInterval = setInterval(() => {
      this.drawScoreBoard();
    }, 10);
  }

  ngAfterViewInit(): void {
    let canvas = document.getElementById('score-board') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = NUM_TILES * (TILE_SIZE + SPACING) + SPACING;
    canvas.height = 75;

    this.drawScoreBoard();
  }

  drawScoreBoard() {
    let canvas = document.getElementById('score-board') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(
      SPACING,
      SPACING,
      canvas.width - 2 * SPACING,
      canvas.height - 2 * SPACING
    );

    context.fillStyle = SPACING_COLOR;
    context.fillRect(
      3 * SPACING,
      3 * SPACING,
      canvas.width - 6 * SPACING,
      canvas.height - 6 * SPACING
    );

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(
      4 * SPACING,
      4 * SPACING,
      canvas.width - 8 * SPACING,
      canvas.height - 8 * SPACING
    );

    context.font = '20px Lucida Console';
    context.fillStyle = SNAKE_COLOR;
    context.fillText('Timer: ' + JSON.stringify(this.gameState.timer), 25, 46);
    context.fillText('Score: ' + JSON.stringify(this.gameState.score), 300, 46);
  }
}
