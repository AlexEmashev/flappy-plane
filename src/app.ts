import settings from './settings';
import gameResources from './resources';
import { BottomClouds } from './bottom-clouds';
import { Plane } from './plane';
import { Clouds } from './clouds';
import { Pipes } from './pipes';
import { Titles } from './titles';
import {drawSprite} from './utils';
import {Button} from './button';
/**
 * Initializes the game
 */
export default function init() {
  const context = addCanvas();

  setEventLoop(context);
}

const buttons: Button[] = [];

function addCanvas(): CanvasRenderingContext2D {
  const gameContainerEl = document.getElementById('game');
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');
  canvas.id = settings.canvasName;
  canvas.width = settings.worldWidth;
  canvas.height = settings.worldHeight;

  canvas.onmousemove = (e) => mouseMove(e);
  canvas.onmousedown = (e) => mouseDown(e);
  canvas.onmouseup = (e) => mouseUp(e);

  gameContainerEl.appendChild(canvas);
  return canvasContext;
}

function setEventLoop(context: CanvasRenderingContext2D) {
  const bottomClouds = new BottomClouds();
  const plane = new Plane();
  const clouds = new Clouds();
  const pipes = new Pipes();
  const titles = new Titles();
  const startButton = new Button(
    context,
    gameResources.startButtonNormalSpriteElement,
    gameResources.startButtonHoverSpriteElement,
    gameResources.startButtonPressSpriteElement
  );

  startButton.onHover(() => {
    console.log(`🔰 button hover!`);
  });

  startButton.onUp(() => {
    console.log(`🔰 button pressed!`);
  })

  buttons.push(startButton);

  setInterval(() => {
    // Check collision
    pipes.checkCollision(plane.hitbox);
    // Draw objects
    drawWorld(context);
    bottomClouds.drawClouds(context);
    clouds.draw(context);
    titles.drawGameTitle(context);
    titles.drawGameOverTitle(context);
    startButton.draw();
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

function mouseMove(e: MouseEvent) {
  for (const button of buttons) {
    button.mouseMove({
      x: e.offsetX,
      y: e.offsetY
    });
  }
}

function mouseDown(e: MouseEvent) {
  for (const button of buttons) {
    button.mouseDown({
      x: e.offsetX,
      y: e.offsetY
    });
  }
}

function mouseUp(e: MouseEvent) {
  for (const button of buttons) {
    button.mouseUp({
      x: e.offsetX,
      y: e.offsetY
    });
  }
}