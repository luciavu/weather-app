// TODO: Handle search input from user
import handleError from './errorHandler.js';
import fetchWeatherData from './weatherAPI.js';
import { renderPage } from './ui.js';
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

const handleSearch = async () => {
  const searchbar = document.getElementById('searchbar');
  const location = searchbar.value.trim(); // remove extra whitespace
  console.log(`User just searched for ${location}`); // REMOVE

  if (location === '') {
    handleError('Please enter a location.');
    searchbar.blur();
  } else {
    // Attempt to call weather API with user input location
    try {
      const weatherData = await fetchWeatherData(location);

      if (weatherData) {
        console.log('Weather data:', weatherData);
        // Function to update UI
        console.log('success!!');
        renderPage(weatherData);
      } else {
        handleError('No weather data found.');
      }
    } catch (error) {
      handleError('An error occurred while fetching data.');
    }
    searchbar.blur();
  }
};
