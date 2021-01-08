import settings from './settings';
import gameResources from './resources';
import { BottomClouds } from './bottom-clouds';
import {Plane} from './plane';
import {Clouds} from './clouds';
import {Pipes} from './pipes';
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
  const clouds = new Clouds();
  const pipes = new Pipes();

  setInterval(() => {
    // Check collision
    pipes.checkCollision(plane.hitbox);
    // Draw objects
    drawWorld(context);
    bottomClouds.drawClouds(context);
    clouds.draw(context);
    drawTitle(context);
    drawStartButton(context);
    pipes.draw(context);
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

/**
 * Function for debug purposes to draw a sprite and adjust sizes.
 * @param context
 */
function debugSprite(context: CanvasRenderingContext2D) {
  context.drawImage(gameResources.spriteCloud2,
    0, 0,
    50, 30
  );
}
