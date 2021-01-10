import settings from "@src/settings";
import { BottomClouds } from "@src/objects/bottom-clouds";
import { Clouds } from "@src/objects/clouds";
import { AnimationState, GameSceneEnum, IGameScene, IPoint, MouseEventTypeEnum, PlaneStatesEnum } from "@src/models";
import { Pipes } from "@src/objects/pipes";
import { Plane } from "@src/objects/plane";
import { Titles } from "@src/objects/titles";
import { GameWorld } from "@src/objects/world";

export class Gameplay implements IGameScene {
  data = {
    score: 0
  };
  goToStateCallback: (name: GameSceneEnum) => void;
  updateGameScoreCallback: (score: number) => void;
  name = GameSceneEnum.Gameplay;
  isGameOver = false;
  gameOverSequenceFrames = 90;
  planePosition: IPoint;
  planeDeltaY = 0;
  pipesGeneration: number;

  private world: GameWorld;
  private bottomClouds: BottomClouds;
  private plane: Plane;
  private clouds: Clouds;
  private titles: Titles;
  private pipes: Pipes;

  constructor(private context: CanvasRenderingContext2D) {
    this.world = new GameWorld(this.context);
    this.bottomClouds = new BottomClouds(this.context);
    this.clouds = new Clouds(this.context);
    this.plane = new Plane(this.context);
    this.plane.planeState = PlaneStatesEnum.flyDown;
    this.planePosition = this.plane.position;
    this.pipes = new Pipes(this.context);
    this.pipesGeneration = -1;
    this.titles = new Titles(this.context);
  }

  userInput(point: IPoint, eventType: MouseEventTypeEnum) {
    if (this.isGameOver) return;

    if (eventType == MouseEventTypeEnum.down) {
      this.planeFlyUp();
    }
  };

  render() {
    if (this.checkCollision()) {
      this.isGameOver = true;
      this.renderGameOverSequence();
      return;
    }

    this.checkCollision();
    this.renderGamePlaySequence();
  };

  /**
   * Renders gameplay sequence.
   */
  renderGamePlaySequence() {
    this.updateScore();
    this.planeflyDown();

    this.world.draw();
    this.bottomClouds.draw();
    this.clouds.draw()
    this.pipes.draw();
    this.plane.draw();
    this.titles.drawScore(this.data.score);
  }

  /**
   * Renders game over sequence
   */
  renderGameOverSequence() {
    this.gameOverSequenceFrames -= 1;
    if (this.gameOverSequenceFrames === 0) {
      this.goToStateCallback(GameSceneEnum.ScoreScreen);
    }

    this.bottomClouds.animationState = AnimationState.pause;
    this.clouds.animationState = AnimationState.pause;
    this.plane.animationState = AnimationState.pause;
    this.pipes.animationState = AnimationState.pause;

    this.world.draw();
    this.bottomClouds.draw();
    this.clouds.draw()
    this.pipes.draw();
    this.plane.draw();
    this.titles.drawScore(this.data.score);
  }

  /**
   * Makes plane to fly down
   */
  private planeflyDown() {
    this.planeDeltaY -= settings.gravity;
    this.planePosition.y -= this.planeDeltaY;
    if (this.planeDeltaY < 0) {
      this.plane.planeState = PlaneStatesEnum.flyDown;
    }
    if (this.planeDeltaY >= 0) {
      this.plane.planeState = PlaneStatesEnum.flyUp;
      if (this.planePosition.y < 0) {
        this.planeDeltaY = 0;
      }
    }

    // //ToDo: Remove me after debugging is done.
    // this.autoFlyUp();
  }

  /**
   * Makes plane fly up (for debug purposes)
   */
  private autoFlyUp() {
    if (this.planePosition.y > settings.worldHeight * 0.5 && this.planePosition.y < settings.worldHeight * 0.6) {
      this.planeFlyUp();
    }
  }

  /**
   * Makes plane to fly up
   */
  private planeFlyUp() {
    this.planeDeltaY = settings.defaultPlaneDeltaY;
  }

  /**
   * Updates game score
   */
  private updateScore() {
    if (this.plane.position.x > this.pipes.position.x && this.pipesGeneration != this.pipes.pipesGeneration) {
      this.pipesGeneration = this.pipes.pipesGeneration;
      this.data.score++;

      if(this.updateGameScoreCallback) {
        this.updateGameScoreCallback(this.data.score);
      }
    }
  }

  /**
   * Checks if plane and pipes collide
   */
  private checkCollision(): boolean {
    if (this.pipes.checkCollision(this.plane.hitbox)) {
      return true;
    }

    if (this.plane.position.y > settings.worldHeight) {
      return true;
    }

    return false;
  }
}