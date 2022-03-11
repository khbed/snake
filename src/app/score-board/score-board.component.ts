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

const SCORE_BOARD_WIDTH = NUM_TILES * (TILE_SIZE + SPACING) + SPACING;
const SCORE_BOARD_HEIGHT = 75;

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

    canvas.width = SCORE_BOARD_WIDTH;
    canvas.height = SCORE_BOARD_HEIGHT;

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
    const text = `score: ${this.gameState.score}`;
    context.fillText(text, 30, 45);
    const text2 = `timer: ${this.gameState.timer}`;
    const text2Pos = SCORE_BOARD_WIDTH - 30 - context.measureText(text2).width;
    context.fillText(text2, text2Pos, 45);
  }
}
