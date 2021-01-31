import settings from '@src/settings';
import gameResourcesService from '@src/resources';
import { AnimationState, ISprite } from '@src/models';
import { drawSprite } from '@src/utils';

/**
 * Draws bottom clouds line
 */
export class BottomClouds {
  animationState = AnimationState.play;
  cloudsSpeed = 2;
  private cloudsWidth = settings.worldWidth / 1.28;
  private cloudsHeight = settings.worldHeight / 5.68;
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
      currentSpritePosition += this.cloudsWidth - 1; // -1 to remove small gap artifact between clouds
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
    // Coordinates of the right most cloud (-1px to remove small gap artifact between sprites)
    const lastCloudRightBorderCoordinate = lastCloud.x + lastCloud.width - 1;

    // When right most cloud fully drawn to display add next one
    if (lastCloudRightBorderCoordinate <= settings.worldWidth) {
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