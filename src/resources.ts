import settings from './settings';

interface IGameSprite {
  src: string,
  width: number,
  height: number,
  offsetX?: number,
  offsetY?: number
}

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
      this.bottomClouds.src = settings.sprites.bottomClouds
    }

    return this.bottomClouds;
  }

  private cloud1: HTMLImageElement;
  get spriteCloud1(): HTMLImageElement {
    if (!this.cloud1) {
      this.cloud1 = new Image();
      this.cloud1.src = settings.sprites.cloud1
    }

    return this.cloud1;
  }

  private cloud2: HTMLImageElement;
  get spriteCloud2(): HTMLImageElement {
    if (!this.cloud2) {
      this.cloud2 = new Image();
      this.cloud2.src = settings.sprites.cloud2
    }

    return this.cloud2;
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