import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EMPTY_TILE_COLOR, SNAKE_COLOR, SPACING, SPACING_COLOR } from '../constants';
import { GameStateService } from '../game-state.service';

const BACKGROUND_SIZE = 700;
const POP_WIDTH = 300;
const POP_HEIGHT = 130;
const BTN_SIZE = 50;

@Component({
  selector: 'app-pause-popup',
  templateUrl: './pause-popup.component.html',
  styleUrls: ['./pause-popup.component.scss'],
})
export class PausePopupComponent implements AfterViewInit {
  unpausedHovered = false;
  restartHovered = false;
  constructor(public gameState: GameStateService) {}

  ngAfterViewInit(): void {
    let interval = setInterval(() => {
      if (this.gameState.paused) {
        this.drawBackground();
        this.drawPopup();
        this.drawUnpause();
        this.drawRestart();
      } else {
        this.closePopups();
      }
    }, 20);
  }

  closePopups() {
    let canvas = document.getElementById('pause-popup') as HTMLCanvasElement;
    canvas.hidden = true;

    let canvas2 = document.getElementById('pause-back') as HTMLCanvasElement;
    canvas2.hidden = true;

    let canvas3 = document.getElementById('unpause') as HTMLCanvasElement;
    canvas3.hidden = true;

    let canvas4 = document.getElementById('restart') as HTMLCanvasElement;
    canvas4.hidden = true;
  }

  centerCanvas(canvas: HTMLCanvasElement) {
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
  }

  drawBackground() {
    let canvas = document.getElementById('pause-back') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden = false;
    canvas.width = BACKGROUND_SIZE;
    canvas.height = BACKGROUND_SIZE;

    this.centerCanvas(canvas);

    context.fillStyle = SPACING_COLOR;
    context.globalAlpha = 0.2;

    context.fillRect(0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE);
  }

  drawPopup() {
    let canvas = document.getElementById('pause-popup') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden = false;
    canvas.width = POP_WIDTH;
    canvas.height = POP_HEIGHT;

    this.centerCanvas(canvas);

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(0, 0, POP_WIDTH, POP_HEIGHT);

    context.fillStyle = SPACING_COLOR;
    context.fillRect(
      2 * SPACING,
      2 * SPACING,
      POP_WIDTH - 4 * SPACING,
      POP_HEIGHT - 4 * SPACING
    );

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(
      3 * SPACING,
      3 * SPACING,
      POP_WIDTH - 6 * SPACING,
      POP_HEIGHT - 6 * SPACING
    );
  }

  drawUnpause(){
    let canvas = document.getElementById('unpause') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden =  false;
    canvas.width = BTN_SIZE;
    canvas.height = BTN_SIZE;

    this.centerCanvas(canvas);
    canvas.style.transform = 'translate(-150%, -50%)';

    context.fillStyle = SPACING_COLOR;
    context.fillRect(0, 0, BTN_SIZE, BTN_SIZE);

    context.fillStyle = EMPTY_TILE_COLOR;
    if (this.unpausedHovered) context.globalAlpha = 0.85;
    const INNER_SIZE = BTN_SIZE - 2 * SPACING;
    context.fillRect(SPACING, SPACING, INNER_SIZE, INNER_SIZE);

    context.fillStyle = SNAKE_COLOR;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = '23px Lucida Console';
    context.fillText('▶', BTN_SIZE / 2, BTN_SIZE / 2);
  }

  drawRestart(){
    let canvas = document.getElementById('restart') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden =  false;
    canvas.width = BTN_SIZE;
    canvas.height = BTN_SIZE;

    this.centerCanvas(canvas);
    canvas.style.transform = 'translate(50%, -50%)';

    context.fillStyle = SPACING_COLOR;
    context.fillRect(0, 0, BTN_SIZE, BTN_SIZE);

    context.fillStyle = EMPTY_TILE_COLOR;
    if (this.restartHovered) context.globalAlpha = 0.85;
    const INNER_SIZE = BTN_SIZE - 2 * SPACING;
    context.fillRect(SPACING, SPACING, INNER_SIZE, INNER_SIZE);

    context.fillStyle = SNAKE_COLOR;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = '30px Lucida Console';
    context.fillText('↻', BTN_SIZE / 2, BTN_SIZE / 2);
  }
}
