import settings from '@src/settings';
export class GameWorld {

  private _skyGradient: CanvasGradient;
  get skyGradient() {
    if (this._skyGradient) return this._skyGradient;

    this._skyGradient = this.context.createLinearGradient(0, 0, 0, settings.worldHeight);
    this._skyGradient.addColorStop(0, settings.worldBackground.top);
    this._skyGradient.addColorStop(1, settings.worldBackground.bottom);
  }

  constructor(private context: CanvasRenderingContext2D) {
  }

  draw() {
    this.context.fillStyle = this.skyGradient;
    this.context.fillRect(0, 0, settings.worldWidth, settings.worldHeight);
  }
}