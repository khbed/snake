import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  EMPTY_TILE_COLOR,
  SNAKE_COLOR,
  SPACING,
  SPACING_COLOR,
  Vec2,
} from '../constants';
import { GameStateService } from '../game-state.service';

const BACK_SIZE = 700;
const POP_SIZE = 300;
const BTN_SIZE = 50;

@Component({
  selector: 'app-game-over-popup',
  templateUrl: './game-over-popup.component.html',
  styleUrls: ['./game-over-popup.component.scss'],
})
export class GameOverPopupComponent implements AfterViewInit {
  hovered = false;
  constructor(public gameState: GameStateService) {}

  ngAfterViewInit(): void {
    let interval = setInterval(() => {
      if (this.gameState.gameOver){
        this.drawBackground();
        this.drawPopup();
        this.drawText();
        this.drawButton();
      }
      else {
        this.closeCanvases();
      }
    }, 20);
  }

  centerCanvas(canvas: HTMLCanvasElement) {
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
  }

  closeCanvases(){
    let canvas = document.getElementById('background') as HTMLCanvasElement;
    canvas.hidden = true;

    let canvas2 = document.getElementById('popup') as HTMLCanvasElement;
    canvas2.hidden = true;

    let canvas3 = document.getElementById('button') as HTMLCanvasElement;
    canvas3.hidden = true;

  }

  drawBackground() {
    let canvas = document.getElementById('background') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden = false;

    canvas.width = BACK_SIZE;
    canvas.height = BACK_SIZE;

    this.centerCanvas(canvas);

    context.fillStyle = SPACING_COLOR;
    context.globalAlpha = 0.2;

    context.fillRect(0, 0, BACK_SIZE, BACK_SIZE);
  }

  drawPopup() {
    let canvas = document.getElementById('popup') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden = false;

    canvas.width = POP_SIZE;
    canvas.height = POP_SIZE;

    this.centerCanvas(canvas);

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(0, 0, POP_SIZE, POP_SIZE);

    context.fillStyle = SPACING_COLOR;
    const INNER_SIZE = POP_SIZE - 4 * SPACING;
    context.fillRect(2 * SPACING, 2 * SPACING, INNER_SIZE, INNER_SIZE);

    context.fillStyle = EMPTY_TILE_COLOR;
    const INNER_SIZE_2 = POP_SIZE - 6 * SPACING;
    context.fillRect(3 * SPACING, 3 * SPACING, INNER_SIZE_2, INNER_SIZE_2);
  }

  drawText() {
    let canvas = document.getElementById('popup') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = SNAKE_COLOR;
    context.font = '40px Lucida Console';

    const text = 'GAME OVER';
    const TEXT_SIZE = context.measureText(text);
    context.fillText(text, (POP_SIZE - TEXT_SIZE.width) / 2, 100);

    context.font = '20px Lucida Console';

    const text2 = `score: ${this.gameState.score}`;
    const TEXT_SIZE_2 = context.measureText(text2);
    context.fillText(text2, (POP_SIZE - TEXT_SIZE_2.width) / 2, 150);
  }

  drawButton() {
    let canvas = document.getElementById('button') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden = false;

    canvas.width = BTN_SIZE;
    canvas.height = BTN_SIZE;

    this.centerCanvas(canvas);
    canvas.style.transform = 'translate(-50%, 80%)';

    context.fillStyle = SPACING_COLOR;
    context.fillRect(0, 0, BTN_SIZE, BTN_SIZE);

    context.fillStyle = EMPTY_TILE_COLOR;
    if (this.hovered) context.globalAlpha = 0.9;
    const INNER_SIZE = BTN_SIZE - 2 * SPACING;
    context.fillRect(SPACING, SPACING, INNER_SIZE, INNER_SIZE);

    context.fillStyle = SNAKE_COLOR;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = '30px Lucida Console';
    context.fillText('↻', BTN_SIZE / 2, BTN_SIZE / 2);
  }
}
