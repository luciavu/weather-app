import '../css/styles.css';
import '../css/fontello.css';
import '../css/animation.css';
import {
  addScrollArrowListener,
  addUnitToggleListener,
  addGeolocationRequestListener,
  temporarilyHidePage,
} from './ui';
import { addSearchEventListener } from './search.js';
import { fetchData } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
  temporarilyHidePage();
  addScrollArrowListener();
  addUnitToggleListener();
  addGeolocationRequestListener();
  addSearchEventListener();

  const defaultLocation = 'Tokyo';
  fetchData(defaultLocation);
});
