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

/**
 * Describes mouse event type
 */
export enum MouseEventTypeEnum {
  move,
  down,
  up
}

export interface ITextProperties {
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  shadowColor?: string
}

export enum GameSceneEnum {
  TitleScreen = 'TitleScreen',
  Gameplay = 'Gameplay',
  ScoreScreen = 'ScoreScreen'
}

export interface IGameScene {
  data: {
    [key: string]: any;
  };
  name: GameSceneEnum;
  goToStateCallback?: (name: GameSceneEnum) => void;
  userInput: (point: IPoint, eventType: MouseEventTypeEnum) => void;
  render: Function;
}

export enum PlaneStatesEnum {
  flyDown = 'flyDown',
  flyUp = 'flyUp',
  crash = 'crash'
}

export enum AnimationState {
  play,
  pause
}