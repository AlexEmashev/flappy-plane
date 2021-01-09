import settings from './settings';
import gameResources from './resources';
import { BottomClouds } from './bottom-clouds';
import { Plane } from './plane';
import { Clouds } from './clouds';
import { Pipes } from './pipes';
import { Titles } from './titles';
import {drawSprite} from './utils';
import {Button} from './button';
import {IPoint, MouseEventTypeEnum} from './models';
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

  canvas.onmousemove = (e) => mouseEvent({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.move);
  canvas.onmousedown = (e) => mouseEvent({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.down);
  canvas.onmouseup = (e) => mouseEvent({x: e.offsetX, y: e.offsetY}, MouseEventTypeEnum.up);

  gameContainerEl.appendChild(canvas);
  return canvasContext;
}

function setEventLoop(context: CanvasRenderingContext2D) {
  const bottomClouds = new BottomClouds(context);
  const plane = new Plane(context);
  const clouds = new Clouds(context);
  const pipes = new Pipes(context);
  const titles = new Titles(context);
  const startButton = new Button(
    context,
    gameResources.startButtonSprites[0],
    gameResources.startButtonSprites[1],
    gameResources.startButtonSprites[2]
  );
  const againButton = new Button(
    context,
    gameResources.againButtonSprites[0],
    gameResources.againButtonSprites[1],
    gameResources.againButtonSprites[2]
  )

  startButton.onHover(() => {
    console.log(`🔰 button hover!`);
  });

  startButton.onUp(() => {
    console.log(`🔰 button pressed!`);
  })

  buttons.push(startButton);
  buttons.push(againButton);

  setInterval(() => {
    // Check collision
    pipes.checkCollision(plane.hitbox);
    // Draw objects
    drawWorld(context);
    bottomClouds.draw();
    clouds.draw();
    titles.drawGameTitle();
    titles.drawGameOverTitle();
    titles.drawScore();
    titles.drawFinalScore()
    againButton.draw();
    startButton.draw();
    pipes.draw();
    plane.draw();
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
 * Handles mouse events from canvas
 * @param point pointer position
 * @param eventType type of event
 */
function mouseEvent(point: IPoint, eventType: MouseEventTypeEnum) {
  buttons.forEach(button => button.mouseEventHandler(point, eventType));
}