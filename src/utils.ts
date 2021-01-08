import {IHitbox, IPoint} from "./models";

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