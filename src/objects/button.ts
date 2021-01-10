import { IHitbox, IPoint, ISprite, ISpriteElement, MouseEventTypeEnum } from "@src/models";
import { checkPointWithinBox, drawSprite } from "@src/utils";

export enum ButtonStateEnum {
  normal = 'normal',
  hover = 'hover',
  down = 'down'
}

/**
 * Class for button object
 */
export class Button {
  hitbox: IHitbox;
  buttonState = ButtonStateEnum.normal;

  private hoverCallback: () => void;
  private pressCallback: () => void;
  private upCallback: () => void;
  private clickCallback: () => void;

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
   * Handles mouse event from canvas
   * @param point pointer coordinates
   * @param eventType type of mouse events.
   */
  mouseEventHandler(point: IPoint, eventType: MouseEventTypeEnum) {
    const pointerOverButton = checkPointWithinBox(point, this.hitbox);

    switch (eventType) {
      case MouseEventTypeEnum.move:
        this.mouseMove(pointerOverButton);
        return;
      case MouseEventTypeEnum.down:
        this.mouseDown(pointerOverButton);
        return;
      case MouseEventTypeEnum.up:
        this.mouseUp();
        return;
      default:
        return;
    }
  }

  /**
   * Process mouse move event
   * @param isPointerOverButton
   */
  private mouseMove(isPointerOverButton: boolean) {
    if (isPointerOverButton && this.buttonState !== ButtonStateEnum.down) {
      this.buttonState = ButtonStateEnum.hover;
      if (this.hoverCallback) {
        this.hoverCallback();
      }
    }

    if (!isPointerOverButton && this.buttonState === ButtonStateEnum.hover) {
      this.buttonState = ButtonStateEnum.normal;
    }
  }

  /**
   * Process mouse down event
   * @param isPointerOverButton
   */
  private mouseDown(isPointerOverButton: boolean) {
    if (isPointerOverButton) {
      this.buttonState = ButtonStateEnum.down;

      if (this.pressCallback) {
        this.pressCallback();
      }
    }
  }

  /**
   * Process mouse up event
   */
  private mouseUp() {
    if (this.buttonState == ButtonStateEnum.down) {
      this.buttonState = ButtonStateEnum.normal;

      if (this.upCallback) {
        this.upCallback();
      }

      if (this.clickCallback) {
        this.clickCallback();
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

  /**
   * Register callback of button click
   * @param callback
   */
  onClick(callback: () => void) {
    this.clickCallback = callback;
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