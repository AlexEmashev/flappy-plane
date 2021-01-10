
import resources from '@src/resources';
import { BottomClouds } from "@src/bottom-clouds";
import { Button } from "@src/button";
import { Plane } from "@src/plane";
import { GameWorld } from "@src/world";
import { Titles } from '@src/titles';
import { GameSceneEnum, IGameScene, IPoint, MouseEventTypeEnum, PlaneStatesEnum } from '@src/models';
import {Clouds} from '@src/clouds';

export class TitleScreen implements IGameScene {

  name: GameSceneEnum.TitleScreen;
  goToStateCallback: (name: GameSceneEnum) => {};
  data = {};

  private world: GameWorld;
  private bottomClouds: BottomClouds;
  private clouds: Clouds;
  private plane: Plane;
  private startButton: Button;
  private titles: Titles;

  constructor(private context: CanvasRenderingContext2D) {
    this.world = new GameWorld(this.context);
    this.bottomClouds = new BottomClouds(this.context);
    this.clouds = new Clouds(this.context);
    this.titles = new Titles(this.context);
    this.plane = new Plane(this.context);
    this.plane.planeState = PlaneStatesEnum.flyUp;
    this.startButton = new Button(
      this.context,
      resources.startButtonSprites[0],
      resources.startButtonSprites[1],
      resources.startButtonSprites[2]
    );
    this.startButton.onClick(() => this.startButtonClick());
  }

  userInput(point: IPoint, eventType: MouseEventTypeEnum) {
    this.startButton.mouseEventHandler(point, eventType);
  }

  render() {
    this.world.draw();
    this.bottomClouds.draw();
    this.clouds.draw();
    this.plane.draw();
    this.titles.drawGameTitle();
    this.startButton.draw();
  }

  private startButtonClick() {
    if (this.goToStateCallback) {
      this.goToStateCallback(GameSceneEnum.Gameplay);
    }
  }
}