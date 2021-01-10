import gameResources from '@src/resources';
import settings from '@src/settings';
import { AnimationState, ISprite } from '@src/models';
import { drawSprite, randomNumber } from '@src/utils';

interface ICloudSprite extends ISprite {
  speed: number;
}

const CLOUDS_SETTINGS = {
  cloudsCount: 5,
  speed: 3,
  minSize: 1,
  maxSize: 7,
  minCloudHeight: 30, // Minimal height of the cloud from the lower boundary of the canvas
  cloud1: {
    width: 40,
    height: 30
  },
  cloud2: {
    width: 55,
    height: 30
  }
}

export class Clouds {

  animationState = AnimationState.play;
  private clouds: ICloudSprite[] = [];

  constructor(private context: CanvasRenderingContext2D) {
    const cloud1 = this.getNewCloud();
    const cloud2 = this.getNewCloud();
    const cloud3 = this.getNewCloud();
    // Set clouds at the random positions at the start
    this.clouds.push(
      {
        ...cloud1,
        x: randomNumber(0, settings.worldWidth)
      },
      {
        ...cloud2,
        x: randomNumber(0, settings.worldWidth)
      },
      {
        ...cloud3,
        x: randomNumber(0, settings.worldWidth)
      }
    );
  }

  draw() {
    if (this.animationState === AnimationState.play) {
      this.clouds.map(cloud => cloud.x -= cloud.speed)
      this.clouds = this.clouds.filter(cloud => cloud.x + cloud.width >= 0);

      if (!this.clouds.length) {
        this.clouds.push(this.getNewCloud());
      }
    }

    for (const cloud of this.clouds) {
      drawSprite(cloud, this.context);
    }
  }

  /**
   * Generates cloud sprite at the random Y position behind right border of the screen
   * @returns generated sprite with speed set
   */
  getNewCloud(): ICloudSprite {
    const cloudSpriteNumber = randomNumber(1, 2);
    const yCoordinate = randomNumber(0, settings.worldHeight - CLOUDS_SETTINGS.minCloudHeight);
    const cloudSize = randomNumber(CLOUDS_SETTINGS.minSize, CLOUDS_SETTINGS.maxSize);

    return {
      sprite: cloudSpriteNumber === 1 ? gameResources.cloud1Img : gameResources.cloud2Img,
      x: settings.worldWidth,
      y: yCoordinate,
      width: (cloudSpriteNumber === 1 ? CLOUDS_SETTINGS.cloud1.width : CLOUDS_SETTINGS.cloud2.width) * cloudSize,
      height: (cloudSpriteNumber === 1 ? CLOUDS_SETTINGS.cloud1.height : CLOUDS_SETTINGS.cloud2.height) * cloudSize,
      speed: CLOUDS_SETTINGS.speed * cloudSize
    };
  }
}