import gameResources from './resources';
import settings from './settings';
import { ISprite } from './models';
import { randomNumber } from './utils';

interface ICloudSprite extends ISprite {
  speed: number;
}

const CLOUDS_SETTINGS = {
  cloudsCount: 5,
  speed: 5,
  minSize: 1,
  maxSize: 5,
  minCloudHeight: 30 // Minimal height of the cloud from the lower boundary of the canvas
}

export class Clouds {

  private clouds: ICloudSprite[] = [];

  constructor() {
    const cloud1 = this.getNewCloud();
    const cloud2 = this.getNewCloud();
    const cloud3 = this.getNewCloud();
    this.clouds.push(
      {
        ...cloud1,
        x: randomNumber(0, settings.worldWidth / 3)
      },
      {
        ...cloud2,
        x: randomNumber(0, settings.worldWidth / 2)
      },
      {
        ...cloud3,
        x: randomNumber(0, settings.worldWidth)
      }
    );
  }

  draw(context: CanvasRenderingContext2D) {
    this.clouds.map(cloud => cloud.x -= cloud.speed)
    this.clouds = this.clouds.filter(cloud => cloud.x + cloud.width >= 0);

    if (!this.clouds.length) {
      this.clouds.push(this.getNewCloud());
    }

    for (const cloud of this.clouds) {
      context.drawImage(
        cloud.sprite,
        cloud.x,
        cloud.y,
        cloud.width,
        cloud.height
      );
    }
  }

  getNewCloud(): ICloudSprite {
    const cloudSpriteNumber = randomNumber(1, 2);
    const yCoordinate = randomNumber(0, settings.worldHeight - CLOUDS_SETTINGS.minCloudHeight);
    const cloudSize = randomNumber(CLOUDS_SETTINGS.minSize, CLOUDS_SETTINGS.maxSize);

    return {
      sprite: cloudSpriteNumber === 1 ? gameResources.spriteCloud1 : gameResources.spriteCloud2,
      x: settings.worldWidth,
      y: yCoordinate,
      width: 40 * cloudSize,
      height: 30 * cloudSize,
      speed: CLOUDS_SETTINGS.speed * cloudSize
    };
  }
}