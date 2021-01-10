import resources from '@src/resources';
import {BottomClouds} from "@src/bottom-clouds";
import {Button} from "@src/button";
import {GameState, IGameState, IPoint, MouseEventTypeEnum} from "@src/models";
import {Titles} from "@src/titles";
import {GameWorld} from "@src/world";

export class ScoreScreen implements IGameState {
  data = {
    score: 0
  };
  name = GameState.ScoreScreen;

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
    this.againButton.onClick(() => this.goToStateCallback(GameState.Gameplay));
  }

  render() {
    this.world.draw();
    this.bottomClouds.draw();
    this.titles.drawGameOverTitle();
    this.titles.drawFinalScore(this.data.score);
    this.againButton.draw();
  }

  goToStateCallback: (name: GameState) => void;
  userInput(point: IPoint, eventType: MouseEventTypeEnum) {
    this.againButton.mouseEventHandler(point, eventType);
  };

}