import settings from '@src/settings';
import { GameSceneEnum, IGameScene, IPoint, MouseEventTypeEnum } from '@src/models';
import { TitleScreen } from '@src/scenes/title-screen';
import { Gameplay } from '@src/scenes/gameplay';
import { ScoreScreen } from '@src/scenes/score-screen';

/**
 * Game class
 * To start the game use init() function
 */
export class Game {
  private gameScore = 0;
  private context: CanvasRenderingContext2D;
  private currentScene: IGameScene;
  private canvas: HTMLCanvasElement;
  /**
   * Call to start the game
   */
  init() {
    this.addCanvas();
    this.switchGameScene(GameSceneEnum.TitleScreen);
    this.setEventLoop();
  }

  /**
   * Adds canvas to draw the game
   */
  private addCanvas() {
    this.canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
    this.setScale();

    this.context = this.canvas.getContext('2d');
    window.onresize = (() => this.setScale());

    this.canvas.onmousemove = (e) => this.userInput({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.move);
    this.canvas.onmousedown = (e) => this.userInput({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.down);
    this.canvas.onmouseup = (e) => this.userInput({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.up);
  }

  /**
   * Set game event loop
   */
  private setEventLoop() {
    setInterval(() => {
      this.currentScene.render();
    }, settings.gameRefreshRate);
  }

  /**
   * Switches game to certain scene
   * @param sceneName scene to switch
   */
  switchGameScene(sceneName: GameSceneEnum) {
    switch (sceneName) {
      case GameSceneEnum.TitleScreen:
        this.currentScene = new TitleScreen(this.context);
        break;
        case GameSceneEnum.Gameplay:
        this.gameScore = 0;
        this.currentScene = new Gameplay(this.context);

        (this.currentScene as Gameplay).updateGameScoreCallback = (score) => this.updateGameScore(score);
        break;
      case GameSceneEnum.ScoreScreen:
        this.currentScene = new ScoreScreen(this.context);
        (this.currentScene as ScoreScreen).data.score = this.gameScore;
        break;
      default:
        this.currentScene = new TitleScreen(this.context);
        break;
    }

    this.currentScene.goToStateCallback = (sceneName) => this.switchGameScene(sceneName);
  }

  /**
   * Global handler for user input.
   * @param point point on canvas
   * @param eventType type of event (click, hover etc.)
   */
  userInput(point: IPoint, eventType: MouseEventTypeEnum) {
    if (this.currentScene) {
      this.currentScene.userInput(point, eventType);
    }
  }

  /**
   * Updates game score
   * @param score game score
   */
  updateGameScore(score: number) {
    this.gameScore = score;
  }

  /**
   * Recalculate window scale
   */
  setScale() {
    settings.scaleFactor = this.canvas.clientHeight / settings.worldHeight; // Set scale factor for graphics
    // Resize canvas according to window size (so graphics could scale properly without pixelization)
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientHeight * settings.aspectRatio;
  }
}