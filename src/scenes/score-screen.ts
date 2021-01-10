import resources from '@src/resources';
import {BottomClouds} from "@src/objects/bottom-clouds";
import {Button} from "@src/objects/button";
import {GameSceneEnum, IGameScene, IPoint, MouseEventTypeEnum} from "@src/models";
import {Titles} from "@src/objects/titles";
import {GameWorld} from "@src/objects/world";

export class ScoreScreen implements IGameScene {
  data = {
    score: 0
  };
  name = GameSceneEnum.ScoreScreen;

  private world: GameWorld;
  private bottomClouds: BottomClouds;
  private titles: Titles;
  private againButton: Button;

  constructor(private context: CanvasRenderingContext2D) {
    this.world = new GameWorld(this.context);
    this.bottomClouds = new BottomClouds(this.context);
    this.titles = new Titles(this.context);
    this.againButton = new Button(
      this.context,
      resources.againButtonSprites[0],
      resources.againButtonSprites[1],
      resources.againButtonSprites[2]
    );
    this.againButton.onClick(() => this.goToStateCallback(GameSceneEnum.TitleScreen));
  }

  render() {
    this.world.draw();
    this.bottomClouds.draw();
    this.titles.drawGameOverTitle();
    this.titles.drawFinalScore(this.data.score);
    this.againButton.draw();
  }

  goToStateCallback: (name: GameSceneEnum) => void;
  userInput(point: IPoint, eventType: MouseEventTypeEnum) {
    this.againButton.mouseEventHandler(point, eventType);
  };

}