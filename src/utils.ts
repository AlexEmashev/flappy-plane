import settings from "@src/settings";
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
 * @param point screen point in global canvas coordinates
 * @param box box size in game field coordinates (without scale factor applied)
 */
export function checkPointWithinBox(point: IPoint, box: IHitbox): boolean {
  // Correct box to scale
  const correctedBox = {
    x1: box.x1 * settings.scaleFactor,
    x2: box.x2 * settings.scaleFactor,
    y1: box.y1 * settings.scaleFactor,
    y2: box.y2 * settings.scaleFactor
  };

  const pointWithinX = point.x > correctedBox.x1 && point.x < correctedBox.x2;
  const pointWithinY = point.y > correctedBox.y1 && point.y < correctedBox.y2;
  return pointWithinX && pointWithinY;
}

/**
 * Checks if box1 collide with box 2
 * @param box1
 * @param box2
 */
export function checkHitboxCollision(box1: IHitbox, box2: IHitbox): boolean {
  if (checkPointWithinBox({ x: box1.x1 * settings.scaleFactor, y: box1.y1 * settings.scaleFactor }, box2)) return true;
  if (checkPointWithinBox({ x: box1.x2 * settings.scaleFactor, y: box1.y1 * settings.scaleFactor }, box2)) return true;
  if (checkPointWithinBox({ x: box1.x1 * settings.scaleFactor, y: box1.y2 * settings.scaleFactor }, box2)) return true;
  if (checkPointWithinBox({ x: box1.x2 * settings.scaleFactor, y: box1.y2 * settings.scaleFactor }, box2)) return true;

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
      se.dx * settings.scaleFactor,
      se.dy * settings.scaleFactor,
      se.dWidth * settings.scaleFactor,
      se.dHeight * settings.scaleFactor
    );
    return;
  } else {
    context.drawImage(
      s.sprite,
      s.x * settings.scaleFactor,
      s.y * settings.scaleFactor,
      s.width * settings.scaleFactor,
      s.height * settings.scaleFactor
    );
  }
}

/**
 * Renders text to context
 * @param textProps text with properties to render
 * @param context
 */
export function drawText(textProps: ITextProperties, context: CanvasRenderingContext2D) {
  context.font = `${textProps.fontSize * settings.scaleFactor}px ${textProps.fontName}`;
  const textStrokeOffset = 2;

  if (textProps.shadowColor) {
    context.fillStyle = textProps.shadowColor,
    context.fillText(
      textProps.text,
      (textProps.x + textStrokeOffset) * settings.scaleFactor,
      (textProps.y + textStrokeOffset) * settings.scaleFactor
    );
  }

  context.fillStyle = textProps.color,
  context.fillText(
    textProps.text,
    textProps.x * settings.scaleFactor,
    textProps.y * settings.scaleFactor
  );
}

/**
 * Draws rectangle to the context
 * @param x upper left corner X coordinates
 * @param y upper left corner Y coordinates
 * @param width rectangle width
 * @param height rectangle height
 * @param fillStyle fill style for rectangle
 * @param context context to draw
 */
export function drawRectangle(
  x: number,
  y: number,
  width: number,
  height: number,
  fillStyle: string | CanvasGradient | CanvasPattern,
  context: CanvasRenderingContext2D
) {
  context.fillStyle = fillStyle;
  context.fillRect(
    x * settings.scaleFactor,
    y * settings.scaleFactor,
    width * settings.scaleFactor,
    height * settings.scaleFactor
  );
}