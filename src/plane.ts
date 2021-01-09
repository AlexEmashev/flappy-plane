import {IHitbox, ISpriteElement} from './models';
import gameResources from './resources';
import {drawSprite} from './utils';

const PLANE_SETTINGS = {
  spritesCount: 3,
  spriteFrameLimit: 5,
  hitboxScale: 0.8
};

enum planeStates {
  flyDown = 'flyDown',
  flyUp = 'flyUp',
  crash = 'crash'
}

/**
 * Class for plane sprite
 */
export class Plane {

  planeState = planeStates.flyUp;
  private spriteNumber = 0;
  private currentSpriteFrame = 0;
  private planeSprite: ISpriteElement;

  /**
   * Returns plane hitbox.
   */
  get hitbox(): IHitbox {
    // Make hitbox smaller than actual sprite size.
    const scaleFactor = 1 - PLANE_SETTINGS.hitboxScale;
    return {
      x1: this.planeSprite.dx + this.planeSprite.dWidth * scaleFactor,
      y1: this.planeSprite.dy + this.planeSprite.dHeight * scaleFactor,
      x2: (this.planeSprite.dWidth + this.planeSprite.dx) - (this.planeSprite.dWidth * scaleFactor),
      y2: (this.planeSprite.dHeight + this.planeSprite.dy) - (this.planeSprite.dHeight * scaleFactor)
    };
  }

  constructor(private context: CanvasRenderingContext2D) {
    this.planeState = planeStates.flyDown;
    this.planeSprite = gameResources.planeDownSprites[0];
  }

  /**
   * Draws plane on the game context
   */
  draw() {
    let spriteNumber = this.getSpriteNumber();

    switch (this.planeState) {
      case planeStates.flyDown:
        drawSprite(gameResources.planeDownSprites[spriteNumber], this.context);
        break;
      case planeStates.flyUp:
        drawSprite(gameResources.planeUpSprites[spriteNumber], this.context);
        break;
      default:
        break;
    }
  }

  /**
   * Returns sprite number to draw
   */
  private getSpriteNumber(): number {
    this.currentSpriteFrame++;

    if (this.currentSpriteFrame === PLANE_SETTINGS.spriteFrameLimit) {
      this.currentSpriteFrame = 0;
      this.spriteNumber++;

      this.spriteNumber = this.spriteNumber === PLANE_SETTINGS.spritesCount ? 0 : this.spriteNumber;
    }

    return this.spriteNumber;
  }
}