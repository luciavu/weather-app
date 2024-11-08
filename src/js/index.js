import '../css/styles.css';
import '../css/fontello.css';
import '../css/animation.css';
import changeBackground from './background';
import { addScrollArrowListener, addUnitToggleListener, addGeolocationRequestListener } from './ui';
import { addSearchEventListener } from './search.js';
document.addEventListener('DOMContentLoaded', () => {
  changeBackground('');
  addScrollArrowListener();
  addUnitToggleListener();
  addGeolocationRequestListener();
  addSearchEventListener();
});
