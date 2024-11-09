// Handle user interaction and page rendering
import getUserLocation from './geolocation';
import {
  convertUnit,
  createElement,
  checkIsMorning,
  getWeatherCondition,
} from './helperFunctions.js';
import getWeatherIcon from './icons.js';
import { fetchData } from './search.js';
import setBackground from './background';

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
    toggleUnits(newUnit);
  });
};

// Add event listener for geolocation request
export const addGeolocationRequestListener = () => {
  const geolocation = document.querySelector('.geolocation');

  geolocation.addEventListener('click', () => {
    getUserLocation()
      .then((location) => {
        console.log(
          `User location is: Latitude:${location.latitude}, Longitude ${location.longitude}`
        );
        fetchData(location, true);
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
  const loadingIcon = document.querySelector('.animate-spin');
  const newDisplay = loadingIcon.style.display === 'inline-block' ? 'none' : 'inline-block';
  loadingIcon.style.display = newDisplay;
};

// Render page, including updating icons, background, weather details
export const renderPage = (weatherData) => {
  // Update background
  setBackground(getWeatherCondition(weatherData.condition), checkIsMorning(weatherData.time));

  // Update weather details
  for (let key in weatherData) {
    const value = weatherData[key];
    const element = document.querySelector(`.${key}`);

    if (element) {
      // Renders all simple data except forecasts
      element.textContent = value;
    }
  }
  // Render hourly forecast
  renderHourlyForecast(weatherData.hourlyForecast);

  // Render 10 day forecast
  renderTenDayForecast(weatherData.tenDayForecast);
};

// Render hourly forecast divs: time, icon, temperature
const renderHourlyForecast = (hourlyForecast) => {
  const forecastContainer = document.querySelector('.forecast-item-container');
  // Clear previous content
  forecastContainer.textContent = '';

  hourlyForecast.forEach((forecast) => {
    const forecastItem = createElement('div', [
      'forecast-item',
      'frosted',
      'flex-center',
      'fade-in',
    ]);
    const time = createElement('div', ['time'], forecast.time);
    const icon = createElement('i', [
      getWeatherIcon(getWeatherCondition(forecast.condition), checkIsMorning(forecast.time)),
    ]);
    const temperature = createElement(
      'div',
      ['temperature', 'convertable', 'has-unit'],
      forecast.temperature
    );
    forecastItem.append(time, icon, temperature);
    forecastContainer.append(forecastItem);
    setTimeout(() => {
      forecastItem.classList.add('show'); // Renders in smoothly
    }, 50);
  });
};

// Render ten day forecast divs: day, icon, low, high
const renderTenDayForecast = (tenDayForecast) => {
  const forecastContainer = document.querySelector('.day-forecast-div');
  // Clear previous content
  forecastContainer.textContent = '';

  tenDayForecast.forEach((forecast, index) => {
    const item = createElement('div', ['day-forecast-item', 'fade-in']);
    // Current day (first date) displayed as 'Today'
    const day = createElement('div', ['day'], index === 0 ? 'Today' : forecast.day);
    const icon = createElement('i', [
      'day-forecast-icon',
      getWeatherIcon(getWeatherCondition(forecast.condition), true),
    ]);
    const low = createElement('div', ['day-forecast-low', 'convertable'], forecast.tempMin);
    const high = createElement('div', ['day-forecast-high', 'convertable'], forecast.tempMax);

    item.append(day, icon, low, high);

    forecastContainer.append(item);
    setTimeout(() => {
      item.classList.add('show'); // Renders in smoothly
    }, 50);
  });
};

// Toggle main visibility for loading default values on first visit
export const temporarilyHidePage = () => {
  const body = document.querySelector('body');
  body.style.opacity = 0;
  setTimeout(() => {
    body.style.opacity = 1;
  }, 500);
};
