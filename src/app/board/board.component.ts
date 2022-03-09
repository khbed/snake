import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  APPLE_COLOR,
  Directions,
  EMPTY_TILE_COLOR,
  KEY_DIRECTION_MAP,
  NUM_TILES,
  SNAKE_COLOR,
  SPACING,
  SPACING_COLOR,
  TILE_SIZE,
} from '../constants';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements AfterViewInit {
  interval = setInterval(() => {}, 100);

  constructor(public gameState: GameStateService) {
    this.start(this.gameState.interval);
  }

  ngAfterViewInit(): void {
    let canvas = document.getElementById('board') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = NUM_TILES * (TILE_SIZE + SPACING) + SPACING;
    canvas.height = NUM_TILES * (TILE_SIZE + SPACING) + SPACING;

    this.drawBackground();
    this.drawApple();
    this.drawSnake();
  }
  

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (KEY_DIRECTION_MAP.get(event.key)) {
      let curr = KEY_DIRECTION_MAP.get(event.key);
      switch (curr) {
        case Directions.Down: {
          if (this.gameState.lastDirection != Directions.Up) {
            this.gameState.snakeDirection = KEY_DIRECTION_MAP.get(
              event.key
            ) as Directions;
          }
          break;
        }
        case Directions.Up: {
          if (this.gameState.lastDirection != Directions.Down) {
            this.gameState.snakeDirection = KEY_DIRECTION_MAP.get(
              event.key
            ) as Directions;
          }
          break;
        }
        case Directions.Left: {
          if (this.gameState.lastDirection != Directions.Right) {
            this.gameState.snakeDirection = KEY_DIRECTION_MAP.get(
              event.key
            ) as Directions;
          }
          break;
        }
        case Directions.Right: {
          if (this.gameState.lastDirection != Directions.Left) {
            this.gameState.snakeDirection = KEY_DIRECTION_MAP.get(
              event.key
            ) as Directions;
          }
          break;
        }
      }

      if (!this.gameState.started) {
        clearInterval(this.gameState.intervalTimer);
        this.gameState.intervalTimer = setInterval(() => {
          if(!this.gameState.gameOver){
            this.gameState.timer += 1;
          }
        }, 1000);
        this.gameState.started = true;
      }
    }
    else if (event.key == 'x' || event.key == 'X'){
      this.gameState.gameOver = true;
    }
  }

  start(timer: number) {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(!this.gameState.gameOver){
        this.gameState.moveSnake();
        this.drawBackground();
        this.drawApple();
        this.drawSnake();
        this.start(this.gameState.interval);
      }
    }, timer);
  }

  drawBackground() {
    let canvas = document.getElementById('board') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = SPACING_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = EMPTY_TILE_COLOR;

    for (let i = 0; i < NUM_TILES; i++) {
      for (let j = 0; j < NUM_TILES; j++) {
        const X = i * (TILE_SIZE + SPACING) + SPACING;
        const Y = j * (TILE_SIZE + SPACING) + SPACING;

        context.fillRect(X, Y, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  drawSnake() {
    let canvas = document.getElementById('board') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = SNAKE_COLOR;

    for (let tile of this.gameState.snake) {
      const X = tile.x * (TILE_SIZE + SPACING) + SPACING;
      const Y = tile.y * (TILE_SIZE + SPACING) + SPACING;

      context.fillRect(X, Y, TILE_SIZE, TILE_SIZE);
    }
  }

  drawApple() {
    let canvas = document.getElementById('board') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = APPLE_COLOR;
    const X = this.gameState.apple.x * (TILE_SIZE + SPACING) + SPACING;
    const Y = this.gameState.apple.y * (TILE_SIZE + SPACING) + SPACING;

    context.fillRect(X, Y, TILE_SIZE, TILE_SIZE);
  }
}
