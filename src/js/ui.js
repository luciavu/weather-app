// TODO: Handle user interaction and page rendering
import getUserLocation from './geolocation';
import { convertUnit } from './helperFunctions.js';

// Add event listener for page scroll via arrow
export const addScrollArrowListener = () => {
  const arrow = document.querySelector('.arrow-scroll');
  arrow.addEventListener('click', () => {
    window.scrollTo({
      top: innerHeight, // Scroll one screen height's worth
      behavior: 'smooth',
    });
  });
};

// Add event listener for toggling unit
export const addUnitToggleListener = () => {
  const unitToggler = document.querySelector('.weather .temperature');
  unitToggler.addEventListener('click', () => {
    // Toggle unit class
    const currentUnit = unitToggler.classList.contains('celsius') ? 'celsius' : 'farenheit';
    const newUnit = currentUnit === 'celsius' ? 'farenheit' : 'celsius';

    // Update unit class
    unitToggler.classList.remove(currentUnit);
    unitToggler.classList.add(newUnit);

    console.log(`User toggled weather to ${newUnit}`); // REMOVE
    toggleUnits(newUnit);
  });
};

// Add event listener for geolocation request
export const addGeolocationRequestListener = () => {
  const geolocation = document.querySelector('.geolocation');

  geolocation.addEventListener('click', () => {
    console.log('User requested geolocation'); // REMOVE
    getUserLocation()
      .then((location) => {
        console.log(
          `User location is: Latitude:${location.latitude}, Longitude ${location.longitude}`
        ); // REMOVE
        // TODO: Function that plugs the values into a new API call using latitude longitude
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });
};

// Update units on page
const toggleUnits = (newUnit) => {
  const convertableTemperatures = document.getElementsByClassName('convertable');
  const removeCelsius = document.querySelector('.temperature .measurement');
  Array.from(convertableTemperatures).forEach((temperature) => {
    const convertedTemperature = convertUnit(parseInt(temperature.textContent), newUnit);
    temperature.textContent = `${convertedTemperature}`;
    if (temperature !== removeCelsius) {
      temperature.textContent += '°';
    }
  });

  const hasUnits = document.getElementsByClassName('has-unit');
  const unit = newUnit === 'celsius' ? 'C' : 'F';
  Array.from(hasUnits).forEach((temperature) => {
    temperature.textContent += unit;
  });
};

// Toggle loading icon visibility
export const toggleLoadingIcon = () => {
  console.log('Toggle loading');
  const loadingIcon = document.querySelector('.animate-spin');
  const newDisplay = loadingIcon.style.display === 'inline-block' ? 'none' : 'inline-block';
  loadingIcon.style.display = newDisplay;
};

// Render page, including updating icons, background, weather details
export const renderPage = (weatherData) => {
  // Update background
  // Update weather details

  for (let key in weatherData) {
    const value = weatherData[key];

    const element = document.querySelector(`.${key}`);

    if (element) {
      element.textContent = value;
    } else {
      console.log(key, value);
    }
  }
  // Update icons
};
