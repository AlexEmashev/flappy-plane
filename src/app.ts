import settings from './settings';
import { GameSceneEnum, IGameScene, IPoint, MouseEventTypeEnum } from './models';
import { TitleScreen } from './scenes/title-screen';
import {Gameplay} from '@src/scenes/gameplay';
import {ScoreScreen} from '@src/scenes/score-screen';

/**
 * Game class
 * To start the game use init() function
 */
export class Game {
  private gameScore = 0;
  private context: CanvasRenderingContext2D;
  private currentScene: IGameScene;

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
    const gameContainerEl = document.getElementById('game');
    const canvas = document.createElement('canvas');
    canvas.id = settings.canvasName;
    canvas.width = settings.worldWidth;
    canvas.height = settings.worldHeight;
    this.context = canvas.getContext('2d');

    canvas.onmousemove = (e) => this.userInput({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.move);
    canvas.onmousedown = (e) => this.userInput({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.down);
    canvas.onmouseup = (e) => this.userInput({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.up);

    gameContainerEl.appendChild(canvas);
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

  updateGameScore(score: number) {
    this.gameScore = score;
  }
}