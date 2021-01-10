import settings from '@src/settings';
import gameResourcesService from '@src/resources';
import { AnimationState, ISprite } from '@src/models';
import { drawSprite } from '@src/utils';

/**
 * Draws bottom clouds line
 */
export class BottomClouds {

  animationState = AnimationState.play;
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
    if (this.animationState === AnimationState.play) {
      // Move all cloud tiles across X axis
      this.cloudTiles.map(cloud => cloud.x -= this.cloudsSpeed);

      // Remove off screen tile
      this.cloudTiles = this.cloudTiles.filter(cloud => cloud.x + cloud.width >= 0);
    }

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