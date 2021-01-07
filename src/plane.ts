import gameResources from './resources';

const PLANE_SETTINGS = {
  spritesCount: 3,
  spriteFrameLimit: 5
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

  constructor() {
  }

  /**
   * Draws plane on the game context
   * @param context current game context
   */
  draw(context: CanvasRenderingContext2D) {
    let spriteNumber = this.getSpriteNumber();

    switch (this.planeState) {
      case planeStates.flyDown:
        context.drawImage(
          gameResources.spritePlane,
          this.flyDownSprites[spriteNumber].sx, this.flyDownSprites[spriteNumber].sy, // top-left corner of the source
          this.flyDownSprites[spriteNumber].sWidth, this.flyDownSprites[spriteNumber].sHeight, // width and height of the sprite in the source
          this.flyDownSprites[spriteNumber].dx, this.flyDownSprites[spriteNumber].dy, // location on the canvas
          this.flyDownSprites[spriteNumber].dWidth, this.flyDownSprites[spriteNumber].dHeight // width and height on the canvas
        );
        break;
      case planeStates.flyUp:
        context.drawImage(
          gameResources.spritePlane,
          this.flyUpSprites[spriteNumber].sx, this.flyUpSprites[spriteNumber].sy, // top-left corner of the source
          this.flyUpSprites[spriteNumber].sWidth, this.flyUpSprites[spriteNumber].sHeight, // width and height of the sprite in the source
          this.flyUpSprites[spriteNumber].dx, this.flyUpSprites[spriteNumber].dy, // location on the canvas
          this.flyUpSprites[spriteNumber].dWidth, this.flyUpSprites[spriteNumber].dHeight // width and height on the canvas
        );
        break;
      case planeStates.crash:
        // ToDo: plane crash state
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