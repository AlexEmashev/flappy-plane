import settings from './settings';
import gameResourcesService from './resources';
import { ISprite } from './models';

/**
 * Draws bottom clouds line
 */
export class BottomClouds {

  private cloudsHeight = 100;
  private cloudsWidth = 250;
  private cloudsSpeed = 2;
  private cloudTiles: ISprite[] = [];

  constructor() {
    let currentSpritePosition = 0;
    // Init tiles according to canvas width
    while (currentSpritePosition <= settings.worldWidth) {
      this.cloudTiles.push({
        sprite: gameResourcesService.spriteBottomClouds,
        x: currentSpritePosition,
        y: settings.worldHeight - this.cloudsHeight,
        width: this.cloudsWidth,
        height: this.cloudsHeight,

      });
      currentSpritePosition += this.cloudsWidth;
    }
  }

  /**
   * Draws bottom cloud line
   * @param context context to draw to
   */
  drawClouds(context: CanvasRenderingContext2D) {
    // Move all cloud tiles across X axis
    this.cloudTiles.map(cloud => cloud.x -= this.cloudsSpeed);

    // ToDo: in generic algorithm if speed is too big we should check
    // all sprites to be within the screen boundaries

    // Remove off screen tile
    this.cloudTiles = this.cloudTiles.filter(cloud => cloud.x + cloud.width >= 0);

    // Add tile to be drawn
    const lastCloud = this.cloudTiles[this.cloudTiles.length - 1];
    const lastCloudRightBorderCoordinate = lastCloud.x + lastCloud.width;

    if (lastCloudRightBorderCoordinate < settings.worldWidth) {
      this.cloudTiles.push({
        sprite: gameResourcesService.spriteBottomClouds,
        x: lastCloudRightBorderCoordinate,
        y: settings.worldHeight - this.cloudsHeight,
        width: this.cloudsWidth,
        height: this.cloudsHeight
      });
    }

    for (const cloud of this.cloudTiles) {
      context.drawImage(
        cloud.sprite,
        cloud.x,
        cloud.y,
        cloud.width,
        cloud.height
      );
    }
  }
}