import "normalize.css/normalize.css";
import './style.scss';
import app from './app';

app();

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.info('ServiceWorker registered: ', registration);
    }).catch(registrationError => {
      console.error('ServiceWorker registration failed: ', registrationError);
    })
  })
}