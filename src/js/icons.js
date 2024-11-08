// Render icons
const getWeatherIcon = (condition, time) => {
  let morning = true;
  console.log(time.slice(0, 2));
  if (time.slice(0, 2) >= 18) {
    morning = false;
  }
  // Conditions taken from Visual Crossing's condition spreadsheet
  switch (condition.toLowerCase()) {
    // Clear
    case 'clear':
      if (morning) {
        return 'icon-sun-inv';
      }
      return 'icon-moon-inv';

    // Partially cloudy
    case 'partially cloudy':
    case 'mostly clear':
    case 'sky coverage decreasing':
    case 'sky coverage increasing':
    case 'sky unchanged':
      if (morning) {
        return 'icon-cloud-sun-inv';
      } else {
        return 'icon-cloud-moon-inv';
      }

    // Cloudy
    case 'cloudy':
    case 'overcast':
      return 'icon-cloud-inv';

    // Rain
    case 'light rain':
    case 'drizzle':
    case 'heavy drizzle':
    case 'light drizzle':
    case 'heavy drizzle/rain':
    case 'light drizzle/rain':
    case 'rain showers':
    case 'heavy rain and snow':
    case 'heavy rain':
    case 'light rain and snow':
    case 'heavy freezing rain':
    case 'freezing drizzle/freezing rain':
    case 'heavy freezing drizzle/freezing rain':
      return 'icon-rain-inv';

    // Thunderstorms
    case 'thunderstorm':
    case 'thunderstorm without precipitation':
    case 'precipitation in vicinity':
    case 'lightning without thunder':
    case 'diamond dust':
      return 'icon-cloud-flash-inv';

    // Snow
    case 'snow':
    case 'hail':
    case 'hail showers':
    case 'light snow':
    case 'heavy snow':
    case 'snow showers':
    case 'snow and rain showers':
    case 'blowing or drifting snow':
    case 'squalls':
      return 'icon-snow-heavy-inv';

    // Mist
    case 'mist':
    case 'fog':
      if (morning) {
        return 'icon-fog-sun';
      } else {
        return 'icon-fog-moon';
      }

    // Wind
    case 'windy':
    case 'wind':
    case 'dust':
    case 'dust storm':
    case 'smoke or haze':
    case 'funnel cloud/tornado':
      return 'icon-wind';

    // If no matches, use basic sun/moon
    default:
      if (morning) {
        return 'icon-sun-inv';
      } else {
        return 'icon-moon-inv';
      }
  }
};

export default getWeatherIcon;
