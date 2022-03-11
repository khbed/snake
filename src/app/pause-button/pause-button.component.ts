import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EMPTY_TILE_COLOR, SNAKE_COLOR, SPACING, SPACING_COLOR } from '../constants';
import { GameStateService } from '../game-state.service';

const BTN_SIZE = 50;

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.scss'],
})
export class PauseButtonComponent implements AfterViewInit {
  hovered = false;
  constructor(public gameState: GameStateService) {}

  ngAfterViewInit(): void {
    let interval2 = setInterval(() => {
      if(!this.gameState.paused) this.drawButton();
      else this.hideButton();
    }, 20);
  }

  hideButton(){
    let canvas = document.getElementById('pause') as HTMLCanvasElement;
    canvas.hidden = true;
  }

  pause(){
    if(!this.gameState.gameOver){
      this.gameState.paused = true;
    }
  }

  drawButton() {
    let canvas = document.getElementById('pause') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.hidden = false;

    canvas.style.position = 'absolute';
    canvas.style.left = '20px';
    canvas.style.top = '20px';

    context.fillStyle = EMPTY_TILE_COLOR;
    context.fillRect(0, 0, BTN_SIZE, BTN_SIZE);

    context.fillStyle = SPACING_COLOR;
    const INNER_SIZE = BTN_SIZE - 2 * SPACING;
    context.fillRect(SPACING, SPACING, INNER_SIZE, INNER_SIZE);

    context.fillStyle = EMPTY_TILE_COLOR;
    if (this.hovered) context.globalAlpha = 0.85;
    else context.globalAlpha = 1.0;
    const INNER_SIZE_2 = BTN_SIZE - 4 * SPACING;
    context.fillRect(2 * SPACING, 2 * SPACING, INNER_SIZE_2, INNER_SIZE_2);

    context.fillStyle = SNAKE_COLOR;
    context.fillRect(15, 12, 6, 26);
    context.fillRect(29, 12, 6, 26);
  }
}
