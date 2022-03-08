import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  EMPTY_TILE_COLOR,
  SNAKE_COLOR,
  SPACING,
  SPACING_COLOR,
  Vec2,
} from '../constants';
import { GameStateService } from '../game-state.service';

const RESET_BTN_SIZE = 50;

@Component({
  selector: 'app-game-over-popup',
  templateUrl: './game-over-popup.component.html',
  styleUrls: ['./game-over-popup.component.scss'],
})
export class GameOverPopupComponent {
  constructor(public gameState: GameStateService) {
    let intervalId = setInterval(() => {
      if (this.gameState.gameOver) {
        this.drawPopup();
      } else {
        let canvasBackground = document.getElementById(
          'background'
        ) as HTMLCanvasElement;
        canvasBackground.width = 0;
        canvasBackground.height = 0;

        let canvas = document.getElementById(
          'popup'
        ) as HTMLCanvasElement;
        canvas.width = 400;
        canvas.height = 400;
      }
    }, 30);
  }

  @HostListener('document:mousedown', ['$event'])
  handleKeyboardEvent(event: MouseEvent) {
    let canvas = document.getElementById('popup') as HTMLCanvasElement;
    if (this.gameState.gameOver) {
      let rect = document
        .getElementById('popup')
        ?.getBoundingClientRect() as DOMRect;
      let posX = event.clientX - rect.left;
      let posY = event.clientY - rect.top;
      let buttonX = canvas.width / 2 - RESET_BTN_SIZE / 2;
      let buttonY = 250;
      if (
        posX > buttonX &&
        posX < buttonX + RESET_BTN_SIZE &&
        posY > buttonY &&
        posY < buttonY + RESET_BTN_SIZE
      ) {
        this.gameState.reset();
      }
    }
  }

  drawPopup() {
    let canvasBackground = document.getElementById(
      'background'
    ) as HTMLCanvasElement;
    let contextBackground = canvasBackground.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    canvasBackground.width = 1000;
    canvasBackground.height = 1000;

    canvasBackground.style.position = 'absolute';
    canvasBackground.style.left = '50%';
    canvasBackground.style.top = '50%';
    canvasBackground.style.transform = 'translate(-50%, -50%)';

    contextBackground.fillStyle = SPACING_COLOR;
    contextBackground.fillRect(
      0,
      0,
      canvasBackground.width,
      canvasBackground.height
    );

    let canvas = document.getElementById('popup') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = 400;
    canvas.height = 400;

    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';

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

    context.font = '50px Lucida Console';
    context.fillStyle = SNAKE_COLOR;
    context.fillText('Game Over', 55, 75);
    context.font = '25px Lucida Console';
    context.fillText(
      'Final Score: ' + JSON.stringify(this.gameState.score),
      55,
      150
    );

    context.fillStyle = SPACING_COLOR;
    context.fillRect(
      canvas.width / 2 - RESET_BTN_SIZE / 2,
      250,
      RESET_BTN_SIZE,
      RESET_BTN_SIZE
    );

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(
      canvas.width / 2 - RESET_BTN_SIZE / 2 + SPACING,
      250 + SPACING,
      RESET_BTN_SIZE - 2 * SPACING,
      RESET_BTN_SIZE - 2 * SPACING
    );

    context.fillStyle = SNAKE_COLOR;
    context.font = '35px Lucida Console';
    context.fillText('↻', 186, 286);
  }
}
