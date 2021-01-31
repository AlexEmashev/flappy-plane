import gameResources from '@src/resources';
import settings from '@src/settings';
import { drawSprite, drawText } from '@src/utils';

export class Titles {
  constructor(private context: CanvasRenderingContext2D) {}

  /**
   * Renders game name
   */
  drawGameTitle() {
    drawSprite(gameResources.gameTitleSprite, this.context);
  }

  /**
   * Renders game over title
   */
  drawGameOverTitle() {
    drawSprite(gameResources.gameOverSprite, this.context);
  }

  /**
   * Renders current score
   * @param score
   */
  drawScore(score: number = 0) {
    const fontWidth = 18;
    const offset = score.toString().length * fontWidth;

    drawText({
      text: score.toString(),
      x: settings.worldWidth / 2 - offset,
      y: settings.worldHeight / 7,
      color: 'white',
      fontSize: 64,
      fontName: 'monospace',
      shadowColor: '#04132358'
    }, this.context);
  }

  /**
   * Renders final score info
   * @param score
   */
  drawFinalScore(score: number = 0) {
    const finalScore = `score: ${score}`;

    const letterWidth = 10;
    const offset = finalScore.toString().length * letterWidth;

    drawText({
      text: finalScore.toString(),
      x: settings.worldWidth / 2 - offset,
      y: settings.worldHeight / 2.7,
      color: 'white',
      fontSize: 36,
      fontName: 'monospace',
      shadowColor: '#04132358'
    }, this.context);
  }
}