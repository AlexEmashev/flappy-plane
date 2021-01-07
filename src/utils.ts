/**
 * Return random number between min and max params
 * @param min
 * @param max
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}