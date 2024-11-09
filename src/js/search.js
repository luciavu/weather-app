// Handle search input from user
import handleError from './errorHandler.js';
import { fetchWeatherData } from './weatherAPI.js';
import { renderPage, toggleLoadingIcon } from './ui.js';

// Add event listener for search input interaction
export const addSearchEventListener = () => {
  const searchbar = document.getElementById('searchbar');
  searchbar.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
      handleSearch();
    }
  });

  const searchIcon = document.querySelector('.icon-search');
  searchIcon.addEventListener('click', handleSearch);
};

const handleSearch = () => {
  const searchbar = document.getElementById('searchbar');
  const location = searchbar.value.trim(); // remove extra whitespace

  if (location === '') {
    handleError('Please enter a location.');
    searchbar.blur();
  } else {
    // Attempt to call weather API with user input location
    fetchData(location);
    searchbar.blur();
  }
};

export const fetchData = async (location, geolocation = false) => {
  try {
    toggleLoadingIcon();
    const weatherData = await fetchWeatherData(location, geolocation);
    if (weatherData) {
      // Function to update UI
      renderPage(weatherData);
    } else {
      handleError('No weather data found.');
    }
    toggleLoadingIcon();
  } catch (error) {
    toggleLoadingIcon();
    handleError('An error occurred while fetching data.');
  }
};
