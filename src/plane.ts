import gameResources from './resources';

const PLANE_SETTINGS = {
  spritesCount: 3,
  spriteFrameLimit: 5
};

/**
 * Class for plane sprite
 */
export class Plane {

  private spriteNumber = 0;
  private currentSpriteFrame = 0;
  private sprites = [
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
  ]

  constructor() {
  }

  /**
   * Draws plane on the game context
   * @param context current game context
   */
  draw(context: CanvasRenderingContext2D) {
    let spriteNumber = this.getSpriteNumber();

    context.drawImage(
      gameResources.spritePlane,
      this.sprites[spriteNumber].sx, this.sprites[spriteNumber].sy, // top-left corner of the source
      this.sprites[spriteNumber].sWidth, this.sprites[spriteNumber].sHeight, // width and height of the sprite in the source
      this.sprites[spriteNumber].dx, this.sprites[spriteNumber].dy, // location on the canvas
      this.sprites[spriteNumber].dWidth, this.sprites[spriteNumber].dHeight // width and height on the canvas
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
}