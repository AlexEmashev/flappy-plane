import {IHitbox, IPoint, ISprite, ISpriteElement, ITextProperties} from "./models";

/**
 * Return random number between min and max params
 * @param min
 * @param max
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Checks if point wihin coordinates of the box.
 */
export function checkPointWithinBox(point: IPoint, box: IHitbox): boolean {
  const pointWithinX = point.x > box.x1 && point.x < box.x2;
  const pointWithinY = point.y > box.y1 && point.y < box.y2;
  return pointWithinX && pointWithinY;
}

/**
 * Checks if box1 collide with box 2
 * @param box1
 * @param box2
 */
export function checkHitboxCollision(box1: IHitbox, box2: IHitbox): boolean {
  if (checkPointWithinBox({ x: box1.x1, y: box1.y1 }, box2)) return true;
  if (checkPointWithinBox({ x: box1.x2, y: box1.y1 }, box2)) return true;
  if (checkPointWithinBox({ x: box1.x1, y: box1.y2 }, box2)) return true;
  if (checkPointWithinBox({ x: box1.x2, y: box1.y2 }, box2)) return true;

  return false;
}

/**
 * Draws sprite on the passed context
 * @param sprite
 * @param context
 */
export function drawSprite(sprite: ISprite|ISpriteElement, context: CanvasRenderingContext2D) {
  const se = sprite as ISpriteElement;
  const s = sprite as ISprite;

  if(se.dx) {
    context.drawImage(
      se.sprite,
      se.sx,
      se.sy,
      se.sWidth,
      se.sHeight,
      se.dx,
      se.dy,
      se.dWidth,
      se.dHeight
    );
    return;
  } else {
    context.drawImage(
      s.sprite,
      s.x,
      s.y,
      s.width,
      s.height
    );
  }
}

/**
 * Renders text to context
 * @param textProps text with properties to render
 * @param context
 */
export function drawText(textProps: ITextProperties, context: CanvasRenderingContext2D) {
  context.font = textProps.font;
  const textStrokeOffset = 2;

  if (textProps.shadowColor) {
    context.fillStyle = textProps.shadowColor,
    context.fillText(textProps.text, textProps.x + textStrokeOffset, textProps.y + textStrokeOffset);
  }

  context.fillStyle = textProps.color,
  context.fillText(textProps.text, textProps.x, textProps.y);
}