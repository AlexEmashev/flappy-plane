import {IHitbox, ISprite, ISpriteElement} from './models';
import gameResources from './resources';

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
  private flyDownSprites = [
    {
      sx: -3.4,
      sy: 0,
      sWidth: 80,
      sHeight: 80,
      dx: 100,
      dy: 220,
      dWidth: 100,
      dHeight: 100
    },
    {
      sx: 80,
      sy: 0,
      sWidth: 80,
      sHeight: 80,
      dx: 100,
      dy: 220,
      dWidth: 100,
      dHeight: 100
    },
    {
      sx: 170.4,
      sy: 0,
      sWidth: 80,
      sHeight: 80,
      dx: 100,
      dy: 220,
      dWidth: 100,
      dHeight: 100
    },
  ];
  // ToDo: fix clipping (increase overall sWidth and sHeight)
  private flyUpSprites = [
    {
      sx: 259,
      sy: 0,
      sWidth: 80,
      sHeight: 80,
      dx: 100,
      dy: 220,
      dWidth: 100,
      dHeight: 100
    },
    {
      sx: 344.9,
      sy: 0,
      sWidth: 80,
      sHeight: 80,
      dx: 100,
      dy: 220,
      dWidth: 100,
      dHeight: 100
    },
    {
      sx: 442.4,
      sy: 0,
      sWidth: 80,
      sHeight: 80,
      dx: 100,
      dy: 220,
      dWidth: 100,
      dHeight: 100
    },
  ]

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

  constructor() {
    this.planeSprite = {
      sprite: gameResources.spritePlane,
      sx: this.flyDownSprites[0].sx,
      sy: this.flyDownSprites[0].sy,
      sWidth: this.flyDownSprites[0].sWidth,
      sHeight: this.flyDownSprites[0].sHeight,
      dx: this.flyDownSprites[0].dx,
      dy: this.flyDownSprites[0].dy,
      dWidth: this.flyDownSprites[0].dWidth,
      dHeight: this.flyDownSprites[0].dHeight
    }
  }

  /**
   * Draws plane on the game context
   * @param context current game context
   */
  draw(context: CanvasRenderingContext2D) {
    let spriteNumber = this.getSpriteNumber();

    context.drawImage(
      gameResources.spritePlane,
      this.getPlaneSprite(spriteNumber).sx, this.getPlaneSprite(spriteNumber).sy, // top-left corner of the source
      this.getPlaneSprite(spriteNumber).sWidth, this.getPlaneSprite(spriteNumber).sHeight, // width and height of the sprite in the source
      this.getPlaneSprite(spriteNumber).dx, this.getPlaneSprite(spriteNumber).dy, // location on the canvas
      this.getPlaneSprite(spriteNumber).dWidth, this.getPlaneSprite(spriteNumber).dHeight // width and height on the canvas
    );
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

  /**
   * Returns plane sprite according to plane state
   * @param frame current sprite frame of animation
   */
  private getPlaneSprite(frame = 0): ISpriteElement {
    switch (this.planeState) {
      case planeStates.flyDown:
        this.planeSprite.sx = this.flyDownSprites[frame].sx;
        this.planeSprite.sy = this.flyDownSprites[frame].sy;
        this.planeSprite.sWidth = this.flyDownSprites[frame].sWidth;
        this.planeSprite.sHeight = this.flyDownSprites[frame].sHeight;
        break;
      case planeStates.flyUp:
        this.planeSprite.sx = this.flyUpSprites[frame].sx;
        this.planeSprite.sy = this.flyUpSprites[frame].sy;
        this.planeSprite.sWidth = this.flyUpSprites[frame].sWidth;
        this.planeSprite.sHeight = this.flyUpSprites[frame].sHeight;
        break;
    }

    return this.planeSprite;
  }
}