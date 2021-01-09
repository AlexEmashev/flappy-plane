import settings from './settings';
import gameResourcesService from './resources';
import { ISprite } from './models';
import { drawSprite } from './utils';

/**
 * Draws bottom clouds line
 */
export class BottomClouds {

  private cloudsWidth = settings.worldWidth / 1.28;
  private cloudsHeight = settings.worldHeight / 5.68;
  private cloudsSpeed = 2;
  private cloudTiles: ISprite[] = [];

  constructor(private context: CanvasRenderingContext2D) {
    let currentSpritePosition = 0;
    // Init tiles according to canvas width
    while (currentSpritePosition <= settings.worldWidth) {
      this.cloudTiles.push({
        sprite: gameResourcesService.bottomCloudsImg,
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
   */
  draw() {
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
        sprite: gameResourcesService.bottomCloudsImg,
        x: lastCloudRightBorderCoordinate,
        y: settings.worldHeight - this.cloudsHeight,
        width: this.cloudsWidth,
        height: this.cloudsHeight
      });
    }

    for (const cloud of this.cloudTiles) {
      drawSprite(cloud, this.context);
    }
  }
}