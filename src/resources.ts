import {ISpriteElement} from './models';
import settings from './settings';

class GameResourcesService {
  private static instance: GameResourcesService;

  private _planeImg: HTMLImageElement;
  private get planeImg(): HTMLImageElement {
    if (!this._planeImg) {
      this._planeImg = new Image();
      this._planeImg.src = settings.sprites.planes;
    }

    return this._planeImg;
  }

  private _gameTitlesImg: HTMLImageElement;
  private get gameTitlesImg(): HTMLImageElement {
    if (!this._gameTitlesImg) {
      this._gameTitlesImg = new Image();
      this._gameTitlesImg.src = settings.sprites.titles;
    }

    return this._gameTitlesImg;
  }

  private _gameTitleSprite: ISpriteElement;
  get gameTitleSprite(): ISpriteElement {
    if (!this._gameTitleSprite) {
      this._gameTitleSprite = {
        sprite: this.gameTitlesImg,
        sx: 0,
        sy: 0,
        sWidth: 730,
        sHeight: 65,
        dx: settings.worldWidth / 8,
        dy: settings.worldHeight / 6,
        dWidth: settings.worldWidth / 1.3,
        dHeight: settings.worldHeight / 14.2
      }
    }

    return this._gameTitleSprite;
  }

  private _gameOverSprite: ISpriteElement;
  get gameOverSprite(): ISpriteElement {
    if (!this._gameOverSprite) {
      this._gameOverSprite = {
        sprite: this.gameTitlesImg,
        sx: 0,
        sy: 90,
        sWidth: 373,
        sHeight: 50,
        dx: settings.worldWidth / 7.1,
        dy: settings.worldHeight / 5.8,
        dWidth: settings.worldWidth / 1.3,
        dHeight: settings.worldHeight / 12.6
      }
    }

    return this._gameOverSprite;
  }

  private _bottomCloudsImg: HTMLImageElement;
  get bottomCloudsImg(): HTMLImageElement {
    if (!this._bottomCloudsImg) {
      this._bottomCloudsImg = new Image();
      this._bottomCloudsImg.src = settings.sprites.bottomClouds;
    }

    return this._bottomCloudsImg;
  }

  private _cloud1Img: HTMLImageElement;
  get cloud1Img(): HTMLImageElement {
    if (!this._cloud1Img) {
      this._cloud1Img = new Image();
      this._cloud1Img.src = settings.sprites.cloud1;
    }

    return this._cloud1Img;
  }

  private _cloud2Img: HTMLImageElement;
  get cloud2Img(): HTMLImageElement {
    if (!this._cloud2Img) {
      this._cloud2Img = new Image();
      this._cloud2Img.src = settings.sprites.cloud2;
    }

    return this._cloud2Img;
  }

  private _pipeTopImg: HTMLImageElement;
  get pipeTopImg(): HTMLImageElement {
    if (!this._pipeTopImg) {
      this._pipeTopImg = new Image();
      this._pipeTopImg.src = settings.sprites.pipeTop;
    }

    return this._pipeTopImg;
  }

  private _pipeBottomImg: HTMLImageElement;
  get pipeBottomImg(): HTMLImageElement {
    if (!this._pipeBottomImg) {
      this._pipeBottomImg = new Image();
      this._pipeBottomImg.src = settings.sprites.pipeBottom;
    }

    return this._pipeBottomImg;
  }

  private _startButtonSprites: ISpriteElement[];
  get startButtonSprites(): ISpriteElement[] {
    if (this._startButtonSprites) return this._startButtonSprites;

    const spriteCoordinatesX = [0, 188, 379];
    const spriteCoordinateY = 150;
    const spriteSize = {
      sWidth: 185,
      sHeight: 60
    };

    this._startButtonSprites = [0, 1 ,2].map(spriteNumber => {
      return {
        sprite: this.gameTitlesImg,
        sx: spriteCoordinatesX[spriteNumber],
        sy: spriteCoordinateY,
        sWidth: spriteSize.sWidth,
        sHeight: spriteSize.sHeight,
        dx: settings.worldWidth / 4,
        dy: settings.worldHeight / 1.57,
        dWidth: settings.worldWidth / 2.13,
        dHeight: settings.worldHeight / 16.22
      }
    });

    return this._startButtonSprites;
  }

  private _againButtomSprites: ISpriteElement[];
  get againButtonSprites(): ISpriteElement[] {
    if (this._againButtomSprites) return this._againButtomSprites;

    const spriteXCoordinates = [0, 183, 363];
    const spriteYCoordinate = 232;
    const spriteSizes = { sWidth: 185, sHeight: 60 };

    this._againButtomSprites = [0, 1, 2].map(spriteNumber => {
      return {
        sprite: this.gameTitlesImg,
        sx: spriteXCoordinates[spriteNumber],
        sy: spriteYCoordinate,
        sWidth: spriteSizes.sWidth,
        sHeight: spriteSizes.sHeight,
        dx: settings.worldWidth / 4,
        dy: settings.worldHeight / 1.6,
        dWidth: settings.worldWidth / 2.13,
        dHeight: settings.worldHeight / 16.22
      }
    });

    return this._againButtomSprites;
  }

  private _planeSprites: ISpriteElement[];
  private get planeSprites(): ISpriteElement[] {
    if (this._planeSprites) return this._planeSprites;

    const spriteXCoordinates = [-3.4, 80, 170.4, 259, 344.9, 442.4];
    const spriteYCoordinate = 0;
    const spriteSize = {
      sWidth: 80,
      sHeight: 80
    };

    // ToDo: rename sprite to image in ISprite and ISpriteElement
    this._planeSprites = [0, 1, 2, 3, 4, 5].map(spriteNumber => {
      const spriteHeight = settings.worldHeight / 5.68;
      return {
        sprite: this.planeImg,
        sx: spriteXCoordinates[spriteNumber],
        sy: spriteYCoordinate,
        sWidth: spriteSize.sWidth,
        sHeight: spriteSize.sHeight,
        dx: settings.worldWidth / 10,
        dy: settings.worldHeight / 2 - spriteHeight / 2,
        dWidth: settings.worldWidth / 3.2,
        dHeight: spriteHeight
      }
    });

    return this._planeSprites;
  }

  private _planeUpSprites: ISpriteElement[];
  get planeUpSprites(): ISpriteElement[] {
    if (this._planeUpSprites) return this._planeUpSprites;

    this._planeUpSprites = this.planeSprites.slice(3, 6);
    return this._planeUpSprites;
  }

  private _planeDownSprites: ISpriteElement[];
  get planeDownSprites(): ISpriteElement[] {
    if (this._planeDownSprites) return this._planeDownSprites;

    this._planeDownSprites = this.planeSprites.slice(0, 3);
    return this._planeDownSprites;
  }

  public static getInstance(): GameResourcesService {
    if (!GameResourcesService.instance) {
      GameResourcesService.instance = new GameResourcesService();
    }

    return GameResourcesService.instance;
  }
}

export default GameResourcesService.getInstance();