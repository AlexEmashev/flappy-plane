import { AnimationState, IHitbox, IPoint, ISpriteElement, PlaneStatesEnum } from './models';
import gameResources from './resources';
import { drawSprite } from './utils';

const PLANE_SETTINGS = {
  spritesCount: 3,
  spriteFrameLimit: 5,
  hitboxScale: 0.5
};



/**
 * Class for plane sprite
 */
export class Plane {
  animationState = AnimationState.play;
  position: IPoint;

  private _planeState = PlaneStatesEnum.flyDown;
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

  /**
   * Sets current plane state
   */
  set planeState(state: PlaneStatesEnum) {
    this._planeState = state;
  }

  constructor(private context: CanvasRenderingContext2D) {
    this._planeState = PlaneStatesEnum.flyDown;
    this.planeSprite = gameResources.planeDownSprites[0];
    this.position = {
      x: this.planeSprite.dx,
      y: this.planeSprite.dy
    };
  }

  /**
   * Draws plane on the game context
   */
  draw() {
    let spriteNumber = this.getSpriteNumber();

    let spriteToDraw;
    switch (this._planeState) {
      case PlaneStatesEnum.flyDown:
        spriteToDraw = gameResources.planeDownSprites[spriteNumber];
        break;
      case PlaneStatesEnum.flyUp:
        spriteToDraw = gameResources.planeUpSprites[spriteNumber];
          break;
      default:
        break;
    }

    spriteToDraw.dx = this.position.x;
    spriteToDraw.dy = this.position.y;
    drawSprite(spriteToDraw, this.context);
  }

  /**
   * Returns sprite number to draw
   */
  private getSpriteNumber(): number {
    if (this.animationState === AnimationState.play) {
      this.currentSpriteFrame++;
    }

    if (this.currentSpriteFrame === PLANE_SETTINGS.spriteFrameLimit) {
      this.currentSpriteFrame = 0;
      this.spriteNumber++;

      this.spriteNumber = this.spriteNumber === PLANE_SETTINGS.spritesCount ? 0 : this.spriteNumber;
    }

    return this.spriteNumber;
  }
}