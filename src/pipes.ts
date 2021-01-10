import { AnimationState, IHitbox, IPoint, ISprite } from './models';
import gameResources from './resources';
import settings from './settings';
import { checkHitboxCollision, randomNumber } from './utils';

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

  animationState = AnimationState.play;
  position: IPoint;
  pipesGeneration = 0;
  private pipes: IPipes;

  constructor(private context: CanvasRenderingContext2D) {
    this.pipes = this.getPipes();
    this.position = {
      x: this.pipes.topPipe.x,
      y: this.pipes.topPipe.y
    };
  }

  /**
   * Draws pipes using passed context
   */
  draw() {

    if (this.animationState === AnimationState.play) {
      this.pipes.topPipe.x -= PIPES_SETTINGS.speed;
      this.pipes.bottomPipe.x = this.pipes.topPipe.x;
    }

    if (this.pipes.topPipe.x + PIPES_SETTINGS.width < 0 ) {
      this.pipes = this.getPipes();
      this.pipesGeneration++;
    }

    // Update current position after generation increase
    // Otherwise it would be updated only on the next draw.
    this.position.x = this.pipes.topPipe.x;
    this.position.y = this.pipes.topPipe.y;

    this.context.drawImage(
      this.pipes.topPipe.sprite,
      this.pipes.topPipe.x,
      this.pipes.topPipe.y,
      this.pipes.topPipe.width,
      this.pipes.topPipe.height
    );

    this.context.drawImage(
      this.pipes.bottomPipe.sprite,
      this.pipes.bottomPipe.x,
      this.pipes.bottomPipe.y,
      this.pipes.bottomPipe.width,
      this.pipes.bottomPipe.height
    );
  }

  /**
   * Returns true if passed hitbox collide with one of the pipes
   */
  checkCollision(hitbox: IHitbox): boolean {
    const topPipeHitbox: IHitbox = {
      x1: this.pipes.topPipe.x,
      x2: this.pipes.topPipe.x + this.pipes.topPipe.width,
      y1: this.pipes.topPipe.y,
      y2: this.pipes.topPipe.y + this.pipes.topPipe.height
    };
    const bottomPipeHibox: IHitbox = {
      x1: this.pipes.bottomPipe.x,
      x2: this.pipes.bottomPipe.x + this.pipes.bottomPipe.width,
      y1: this.pipes.bottomPipe.y,
      y2: this.pipes.bottomPipe.y + this.pipes.bottomPipe.height
    };

    if (checkHitboxCollision(hitbox, topPipeHitbox) || checkHitboxCollision(hitbox, bottomPipeHibox)) {
      return true;
    }

    return false;
  }

  /**
   * Creates pipe objects
   */
  private getPipes(): IPipes {
    const pipesOffset = randomNumber(PIPES_SETTINGS.gap / 2, settings.worldHeight - PIPES_SETTINGS.gap / 2);

    let topPipeOffset =  (0 - PIPES_SETTINGS.height) + pipesOffset - PIPES_SETTINGS.gap / 2;
    let bottomPipeOffset = pipesOffset + PIPES_SETTINGS.gap / 2;

    return {
      topPipe: {
        sprite: gameResources.pipeTopImg,
        x: settings.worldWidth,
        y: topPipeOffset,
        width: PIPES_SETTINGS.width,
        height: PIPES_SETTINGS.height
      },
      bottomPipe: {
        sprite: gameResources.pipeBottomImg,
        x: settings.worldWidth,
        y: bottomPipeOffset,
        width: PIPES_SETTINGS.width,
        height: PIPES_SETTINGS.height
      }
    };
  }
}