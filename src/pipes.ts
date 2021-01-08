import { ISprite } from './models';
import gameResources from './resources';
import settings from './settings';
import { randomNumber } from './utils';

interface IPipes {
  topPipe: ISprite,
  bottomPipe: ISprite
}

const PIPES_SETTINGS = {
  speed: 5,
  width: settings.worldWidth / 4.5,
  height: settings.worldHeight,
  gap: settings.worldHeight / 2.3
}

export class Pipes {

  private pipes: IPipes;

  constructor() {
    this.pipes = this.getPipes();
  }

  draw(context: CanvasRenderingContext2D) {
    this.pipes.topPipe.x -= PIPES_SETTINGS.speed;
    this.pipes.bottomPipe.x -= PIPES_SETTINGS.speed;

    if (this.pipes.topPipe.x + PIPES_SETTINGS.width < 0 ) {
      this.pipes = this.getPipes();
    }

    context.drawImage(
      this.pipes.topPipe.sprite,
      this.pipes.topPipe.x,
      this.pipes.topPipe.y,
      this.pipes.topPipe.width,
      this.pipes.topPipe.height
    );

    context.drawImage(
      this.pipes.bottomPipe.sprite,
      this.pipes.bottomPipe.x,
      this.pipes.bottomPipe.y,
      this.pipes.bottomPipe.width,
      this.pipes.bottomPipe.height
    );
  }

  private getPipes(): IPipes {
    const pipesOffset = randomNumber(PIPES_SETTINGS.gap / 2, settings.worldHeight - PIPES_SETTINGS.gap / 2);

    let topPipeOffset =  (0 - PIPES_SETTINGS.height) + pipesOffset - PIPES_SETTINGS.gap / 2;
    let bottomPipeOffset = pipesOffset + PIPES_SETTINGS.gap / 2;

    return {
      topPipe: {
        sprite: gameResources.spritePipeTop,
        x: settings.worldWidth,
        y: topPipeOffset,
        width: PIPES_SETTINGS.width,
        height: PIPES_SETTINGS.height
      },
      bottomPipe: {
        sprite: gameResources.spritePipeBottom,
        x: settings.worldWidth,
        y: bottomPipeOffset,
        width: PIPES_SETTINGS.width,
        height: PIPES_SETTINGS.height
      }
    };
  }
}