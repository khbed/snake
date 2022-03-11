import { Injectable } from '@angular/core';
import { Directions, NUM_TILES, STARTING_POSITION, Vec2 } from './constants';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  audio = new Audio();
  snake: Vec2[] = [STARTING_POSITION];
  snakeDirection: Directions = Directions.None;
  lastDirection: Directions = Directions.None;
  score: number = 0;
  timer: number = 0;
  started = false;
  interval: number = 200;
  apple: Vec2 = { x: -1, y: -1 };
  intervalTimer = setInterval(() => {}, 100);
  paused = false;
  gameOver = false;
  constructor() {
    this.setApplePos();
    this.audio.src = '../assets/pop.wav';
  }

  moveSnake() {
    let tail: Vec2 = { x: -1, y: -1 };
    if (this.snake[0].x == this.apple.x && this.snake[0].y == this.apple.y) {
      this.playSound();
      let index = this.snake.length - 1;
      tail = { x: this.snake[index].x, y: this.snake[index].y };
      this.score += 10;
      if (this.score % 30 == 0 && this.score != 0) {
        if (this.interval > 30) {
          this.interval -= 5;
        }
      }
    }

    if (this.snake.length > 1) {
      for (let i = this.snake.length - 1; i >= 1; i--) {
        this.snake[i] = { x: this.snake[i - 1].x, y: this.snake[i - 1].y };
      }
    }
    switch (this.snakeDirection) {
      case Directions.Left: {
        if (this.snake[0].x > 0) this.snake[0].x = this.snake[0].x - 1;
        else this.snake[0].x = NUM_TILES - 1;
        this.lastDirection = Directions.Left;
        break;
      }
      case Directions.Right: {
        if (this.snake[0].x < NUM_TILES - 1)
          this.snake[0].x = this.snake[0].x + 1;
        else this.snake[0].x = 0;
        this.lastDirection = Directions.Right;
        break;
      }
      case Directions.Up: {
        if (this.snake[0].y > 0) this.snake[0].y = this.snake[0].y - 1;
        else this.snake[0].y = NUM_TILES - 1;
        this.lastDirection = Directions.Up;
        break;
      }
      case Directions.Down: {
        if (this.snake[0].y < NUM_TILES - 1)
          this.snake[0].y = this.snake[0].y + 1;
        else this.snake[0].y = 0;
        this.lastDirection = Directions.Down;
        break;
      }
    }

    let first = true;
    for (let tile of this.snake) {
      if (!first) {
        if (tile.x == this.snake[0].x && tile.y == this.snake[0].y) {
          this.gameOver = true;
        }
      } else first = false;
    }

    if (tail.x != -1 && tail.y != -1) {
      this.snake.push(tail);
      this.setApplePos();
    }
  }

  playSound() {
    this.audio.load();
    this.audio.play();
  }

  reset() {
    this.snake = [{ x: 10, y: 10 }];
    this.setApplePos();
    this.score = 0;
    this.snakeDirection = Directions.None;
    this.lastDirection = Directions.None;
    this.interval = 200;
    this.started = false;
    this.timer = 0;
    this.gameOver = false;
    this.paused = false;
    clearInterval(this.intervalTimer);
  }

  setApplePos() {
    let positions: Vec2[] = [];
    for (let i = 0; i < NUM_TILES; i++) {
      for (let j = 0; j < NUM_TILES; j++) {
        for (let tile of this.snake) {
          if (tile.x != i || tile.y != j) positions.push({ x: i, y: j });
        }
      }
    }
    this.apple = positions[Math.floor(Math.random() * positions.length)];
  }
}
