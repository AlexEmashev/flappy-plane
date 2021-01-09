import {ISpriteElement} from './models';
import settings from './settings';

class GameResourcesService {
  private static instance: GameResourcesService;

  private planeSprites: HTMLImageElement;
  get spritePlane(): HTMLImageElement {
    if (!this.planeSprites) {
      this.planeSprites = new Image();
      this.planeSprites.src = settings.sprites.planes;
    }

    return this.planeSprites;
  }

  private gameTitles: HTMLImageElement;
  get spriteGameTitles(): HTMLImageElement {
    if (!this.gameTitles) {
      this.gameTitles = new Image();
      this.gameTitles.src = settings.sprites.titles;
    }

    return this.gameTitles;
  }

  private bottomClouds: HTMLImageElement;
  get spriteBottomClouds(): HTMLImageElement {
    if (!this.bottomClouds) {
      this.bottomClouds = new Image();
      this.bottomClouds.src = settings.sprites.bottomClouds;
    }

    return this.bottomClouds;
  }

  private cloud1: HTMLImageElement;
  get spriteCloud1(): HTMLImageElement {
    if (!this.cloud1) {
      this.cloud1 = new Image();
      this.cloud1.src = settings.sprites.cloud1;
    }

    return this.cloud1;
  }

  private cloud2: HTMLImageElement;
  get spriteCloud2(): HTMLImageElement {
    if (!this.cloud2) {
      this.cloud2 = new Image();
      this.cloud2.src = settings.sprites.cloud2;
    }

    return this.cloud2;
  }

  private pipeTop: HTMLImageElement;
  get spritePipeTop(): HTMLImageElement {
    if (!this.pipeTop) {
      this.pipeTop = new Image();
      this.pipeTop.src = settings.sprites.pipeTop;
    }

    return this.pipeTop;
  }

  private pipeBottom: HTMLImageElement;
  get spritePipeBottom(): HTMLImageElement {
    if (!this.pipeBottom) {
      this.pipeBottom = new Image();
      this.pipeBottom.src = settings.sprites.pipeBottom;
    }

    return this.pipeBottom;
  }

  private startButtonNormal: ISpriteElement;
  get startButtonNormalSpriteElement(): ISpriteElement {
    const buttonNormalImg = new Image();
    buttonNormalImg.src = settings.sprites.titles;

    if (!this.startButtonNormal) {
      this.startButtonNormal = {
        sprite: buttonNormalImg,
        sx: 0,
        sy: 150,
        sWidth: 185,
        sHeight: 60,
        dx: settings.worldWidth / 4,
        dy: settings.worldHeight / 1.57,
        dWidth: settings.worldWidth / 2.13,
        dHeight: settings.worldHeight / 16.22
      };
    }

    return this.startButtonNormal;
  }

  private startButtonHover: ISpriteElement;
  get startButtonHoverSpriteElement(): ISpriteElement {
    const img = new Image();
    img.src = settings.sprites.titles;

    if (!this.startButtonHover) {
      this.startButtonHover = {
        sprite: img,
        sx: 188,
        sy: 150,
        sWidth: 185,
        sHeight: 60,
        dx: settings.worldWidth / 4,
        dy: settings.worldHeight / 1.57,
        dWidth: settings.worldWidth / 2.13,
        dHeight: settings.worldHeight / 16.22
      };
    }

    return this.startButtonHover;
  }

  private startButtonPress: ISpriteElement;
  get startButtonPressSpriteElement(): ISpriteElement {
    const img = new Image();
    img.src = settings.sprites.titles;

    if (!this.startButtonPress) {
      this.startButtonPress = {
        sprite: img,
        sx: 379,
        sy: 150,
        sWidth: 185,
        sHeight: 60,
        dx: settings.worldWidth / 4,
        dy: settings.worldHeight / 1.57,
        dWidth: settings.worldWidth / 2.13,
        dHeight: settings.worldHeight / 16.22
      };
    }

    return this.startButtonPress;
  }

  private constructor() {
    console.log('🔰 GameResourcesService initialized!');
  }

  public static getInstance(): GameResourcesService {
    if (!GameResourcesService.instance) {
      GameResourcesService.instance = new GameResourcesService();
    }

    return GameResourcesService.instance;
  }
}

export default GameResourcesService.getInstance();