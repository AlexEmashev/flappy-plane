import { AnimationState, IHitbox, IPoint, ISpriteElement, PlaneStatesEnum } from '@src/models';
import gameResources from '@src/resources';
import settings from '@src/settings';
import { drawSprite } from '@src/utils';

const PLANE_SETTINGS = {
  spritesCount: 3,
  spriteFrameLimit: 5,
  hitboxScale: 0.7
};

export enum PLANE_POSITIONS {
  screenCenter,
  gameStart
}

/**
 * Class for plane sprite
 */
export class Plane {
  animationState = AnimationState.play;
  position: IPoint;
  planeSprite: ISpriteElement;

  private _planeState = PlaneStatesEnum.flyDown;
  private spriteNumber = 0;
  private currentSpriteFrame = 0;


  /**
   * Returns plane hitbox.
   */
  get hitbox(): IHitbox {
    // Make hitbox smaller than actual sprite size.
    const scaleFactor = 1 - PLANE_SETTINGS.hitboxScale;
    return {
      x1: this.position.x + this.planeSprite.dWidth * scaleFactor,
      y1: this.position.y + this.planeSprite.dHeight * scaleFactor,
      x2: (this.planeSprite.dWidth + this.position.x) - (this.planeSprite.dWidth * scaleFactor),
      y2: (this.planeSprite.dHeight + this.position.y) - (this.planeSprite.dHeight * scaleFactor)
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

    let planeSprite;
    switch (this._planeState) {
      case PlaneStatesEnum.flyDown:
        planeSprite = gameResources.planeDownSprites[spriteNumber];
        break;
      case PlaneStatesEnum.flyUp:
        planeSprite = gameResources.planeUpSprites[spriteNumber];
          break;
      default:
        break;
    }

    // Don't mutate initial sprite
    const spriteToDraw: ISpriteElement = {
      ...planeSprite,
      dx: this.position.x,
      dy: this.position.y
    };

    drawSprite(spriteToDraw, this.context);
  }

  setPosition(planePosition: PLANE_POSITIONS) {
    switch (planePosition) {
      case PLANE_POSITIONS.screenCenter:
        this.position = {
          x: settings.worldWidth / 2 - this.planeSprite.dWidth / 2,
          y: settings.worldHeight / 2 - this.planeSprite.dHeight / 2
        };
        break;
      case PLANE_POSITIONS.gameStart:
      default:
        this.position = {
          x: settings.worldWidth / 6,
          y: settings.worldHeight / 2 - this.planeSprite.dHeight / 2
        };
        break;
    }
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