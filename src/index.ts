import "normalize.css/normalize.css";
import './style.scss';
import { Game } from './objects/app';

const game = new Game();
game.init();

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.info('ServiceWorker registered: ', registration);
    }).catch(registrationError => {
      console.error('ServiceWorker registration failed: ', registrationError);
    })
  })
}