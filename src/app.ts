import settings from './settings';
import gameResources from './resources';
import { BottomClouds } from './bottom-clouds';
import {Plane} from './plane';
/**
 * Initializes the game
 */
export default function init() {
  const context = addCanvas();

  setEventLoop(context);
}

function addCanvas(): CanvasRenderingContext2D {
  const gameContainerEl = document.getElementById('game');
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');
  canvas.id = settings.canvasName;
  canvas.width = settings.worldWidth;
  canvas.height = settings.worldHeight;

  gameContainerEl.appendChild(canvas);
  return canvasContext;
}

function setEventLoop(context: CanvasRenderingContext2D) {
  const bottomClouds = new BottomClouds();
  const plane = new Plane();
  setInterval(() => {
    drawWorld(context);
    // drawCloud1(context);
    drawTitle(context);
    drawStartButton(context);
    bottomClouds.drawClouds(context);
    plane.draw(context);
  }, settings.gameRefreshRate);
}

function drawWorld(context: CanvasRenderingContext2D) {
  const canvasGradient = context.createLinearGradient(0, 0, 0, settings.worldHeight);
  canvasGradient.addColorStop(0, settings.worldBackground.top);
  canvasGradient.addColorStop(1, settings.worldBackground.bottom);
  context.fillStyle = canvasGradient;
  context.fillRect(0,0, settings.worldWidth, settings.worldHeight);
}

function drawCloud1(context: CanvasRenderingContext2D) {
  context.drawImage(gameResources.spriteCloud1, 0, 0, 40, 30)
}

function drawTitle(context: CanvasRenderingContext2D) {
  context.drawImage(gameResources.spriteGameTitles,
    0, 0,
    730, 65,
    47, 100,
    230, 40
  );
}

function drawStartButton(context: CanvasRenderingContext2D) {
  context.drawImage(gameResources.spriteGameTitles,
    0, 150,
    185, 60,
    80, 360,
    150, 35
  );
}