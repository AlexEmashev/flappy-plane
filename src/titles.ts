import gameResources from './resources';
import gameSettings from './settings';

const TITLES_SETTINGS = {
  gameTitle: {
    dx: gameSettings.worldWidth / 8,
    dy: gameSettings.worldHeight / 6,
    width: gameSettings.worldWidth / 1.3,
    height: gameSettings.worldHeight / 14.2
  },
  gameOverTitle: {
    dx: gameSettings.worldWidth / 7.1,
    dy: gameSettings.worldHeight / 2.84,
    width: gameSettings.worldWidth / 1.3,
    height: gameSettings.worldHeight / 12.6
  }
}

export class Titles {
  drawGameTitle(context: CanvasRenderingContext2D) {
    context.drawImage(gameResources.spriteGameTitles,
      0, 0,
      730, 65,
      TITLES_SETTINGS.gameTitle.dx, TITLES_SETTINGS.gameTitle.dy,
      TITLES_SETTINGS.gameTitle.width, TITLES_SETTINGS.gameTitle.height
    );
  }

  drawGameOverTitle(context: CanvasRenderingContext2D) {
    context.drawImage(gameResources.spriteGameTitles,
      0, 90,
      373, 50,
      TITLES_SETTINGS.gameOverTitle.dx, TITLES_SETTINGS.gameOverTitle.dy,
      TITLES_SETTINGS.gameOverTitle.width, TITLES_SETTINGS.gameOverTitle.height
    );
  }
}