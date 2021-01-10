import settings from './settings';
import { GameState, IGameState, IPoint, MouseEventTypeEnum } from './models';
import { TitleScreen } from './states/title-screen';
import {Gameplay} from '@src/states/gameplay';
import {ScoreScreen} from '@src/states/score-screen';

/**
 * Game class
 * To start the game use init() function
 */
export class Game {
  private gameScore = 0;
  private context: CanvasRenderingContext2D;
  private currentState: IGameState;

  /**
   * Call to start the game
   */
  init() {
    this.addCanvas();
    this.setInitialGameState();
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
   * Sets initial state of the game.
   */
  private setInitialGameState() {
    this.switchGameState(GameState.TitleScreen);
  }

  /**
   * Set game event loop
   */
  private setEventLoop() {
    setInterval(() => {
      this.currentState.render();
    }, settings.gameRefreshRate);
  }

  /**
   * Switches game to certain state
   * @param stateName state to switch
   */
  switchGameState(stateName: GameState) {
    switch (stateName) {
      case GameState.TitleScreen:
        this.currentState = new TitleScreen(this.context);
        break;
        case GameState.Gameplay:
        this.gameScore = 0;
        this.currentState = new Gameplay(this.context);

        (this.currentState as Gameplay).updateGameScoreCallback = (score) => this.updateGameScore(score);
        break;
      case GameState.ScoreScreen:
        this.currentState = new ScoreScreen(this.context);
        (this.currentState as ScoreScreen).data.score = this.gameScore;
        break;
      default:
        this.currentState = new TitleScreen(this.context);
        break;
    }

    this.currentState.goToStateCallback = (stateName) => this.switchGameState(stateName);
  }

  /**
   * Global handler for user input.
   * @param point point on canvas
   * @param eventType type of event (click, hover etc.)
   */
  userInput(point: IPoint, eventType: MouseEventTypeEnum) {
    if (this.currentState) {
      this.currentState.userInput(point, eventType);
    }
  }

  updateGameScore(score: number) {
    this.gameScore = score;
  }
}