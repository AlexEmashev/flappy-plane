import gameResources from './resources';
import { drawSprite } from './utils';

export class Titles {
  constructor(private context: CanvasRenderingContext2D) {}

  drawGameTitle() {
    drawSprite(gameResources.gameTitleSprite, this.context);
  }

  drawGameOverTitle() {
    drawSprite(gameResources.gameOverSprite, this.context);
  }
}