import {IHitbox, IPoint, ISprite, ISpriteElement} from "./models";
import {checkPointWithinBox, drawSprite} from "./utils";

export enum ButtonStateEnum {
  normal = 'normal',
  hover = 'hover',
  down = 'down'
}

export class Button {
  hitbox: IHitbox;
  buttonState = ButtonStateEnum.normal;

  private hoverCallback: () => void;
  private pressCallback: () => void;
  private upCallback: () => void;

  constructor(
    private context: CanvasRenderingContext2D,
    private spriteNormal: ISprite|ISpriteElement,
    private spriteHover: ISprite|ISpriteElement,
    private spritePress: ISprite|ISpriteElement,
    ) {
    const sprite = spriteNormal as ISprite;
    const spriteElement = spriteNormal as ISpriteElement;

    if (spriteElement.dx) {
      this.hitbox = {
        x1: spriteElement.dx,
        x2: spriteElement.dx + spriteElement.dWidth,
        y1: spriteElement.dy,
        y2: spriteElement.dy + spriteElement.dHeight
      };
      return;
    }

    this.hitbox = {
      x1: sprite.x,
      x2: sprite.x + sprite.width,
      y1: sprite.y,
      y2: sprite.y + sprite.height
    };
  }

  /**
   * Call to pass mouse pointer coordinates
   * @param point
   */
  mouseMove(point: IPoint) {
    if (!this.hitbox) return;

    const buttonHovered = checkPointWithinBox(point, this.hitbox);

    if (buttonHovered && this.buttonState !== ButtonStateEnum.down) {
      this.buttonState = ButtonStateEnum.hover;
      if (this.hoverCallback) {
        this.hoverCallback();
      }
    }

    if (!buttonHovered && this.buttonState === ButtonStateEnum.hover) {
      this.buttonState = ButtonStateEnum.normal;
    }
  }

  /**
   * Call to pass coordinates of mouse button down
   * @param point
   */
  mouseDown(point: IPoint) {
    if (!this.hitbox) return;
    const buttonDown = checkPointWithinBox(point, this.hitbox);

    if (buttonDown) {
      this.buttonState = ButtonStateEnum.down;

      if (this.pressCallback) {
        this.pressCallback();
      }
    }
  }

  mouseUp(point: IPoint) {
    if (!this.hitbox) return;

    if (this.buttonState == ButtonStateEnum.down) {
      this.buttonState = ButtonStateEnum.normal;

      if (this.upCallback) {
        this.upCallback();
      }
    }
  }

  /**
   * Registers callback for hover event over the button
   * @param callback
   */
  onHover(callback: () => void) {
    this.hoverCallback = callback;
  }

  /**
   * Registers callback for button press
   * @param callback
   */
  onPress(callback: () => void) {
    this.pressCallback = callback;
  }

  /**
   * Register callback when button was released after press
   * @param callback
   */
  onUp(callback: () => void) {
    this.upCallback = callback;
  }

  draw(): void {
    switch (this.buttonState) {
      case ButtonStateEnum.hover:
        drawSprite(this.spriteHover, this.context);
        break;
      case ButtonStateEnum.down:
        drawSprite(this.spritePress, this.context);
        break;
      default:
        drawSprite(this.spriteNormal, this.context);
        break;
    }
  };
}