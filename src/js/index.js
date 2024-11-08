import '../css/styles.css';
import '../css/fontello.css';
import '../css/animation.css';
import changeBackground from './background';
import {
  addScrollArrowListener,
  addUnitToggleListener,
  addGeolocationRequestListener,
  temporarilyHideMain,
} from './ui';
import { addSearchEventListener } from './search.js';
import { fetchData } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
  const defaultLocation = 'Tokyo';
  temporarilyHideMain();
  changeBackground('');
  addScrollArrowListener();
  addUnitToggleListener();
  addGeolocationRequestListener();
  addSearchEventListener();
  fetchData(defaultLocation);
});
