/**
 * Describes a sprite
 */
export interface ISprite {
  sprite: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
}

/**
 * Discribes single element from sprite set.
 */
export interface ISpriteElement {
  sprite: HTMLImageElement,
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
}

/**
 * Describes hitbox of an object
 */
export interface IHitbox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Describes single point
 */
export interface IPoint {
  x: number,
  y: number
}