// Render icons
const getWeatherIcon = (condition, isMorning) => {
  // Conditions taken from Visual Crossing's condition spreadsheet
  switch (condition) {
    // Clear
    case 'clear':
      if (isMorning) {
        return 'icon-sun-inv';
      }
      return 'icon-moon-inv';

    // Partially cloudy
    case 'partiallyCloudy':
      if (isMorning) {
        return 'icon-cloud-sun-inv';
      } else {
        return 'icon-cloud-moon-inv';
      }

    // Cloudy
    case 'cloudy':
      return 'icon-cloud-inv';

    // Rain
    case 'rain':
      return 'icon-rain-inv';

    // Thunder
    case 'thunder':
      return 'icon-cloud-flash-inv';

    // Snow
    case 'snow':
      return 'icon-snow-heavy-inv';

    // Fog
    case 'fog':
      if (isMorning) {
        return 'icon-fog-sun';
      } else {
        return 'icon-fog-moon';
      }

    // Wind
    case 'windy':
      return 'icon-wind';

    // If no matches, use basic sun/moon
    default:
      if (isMorning) {
        return 'icon-sun-inv';
      } else {
        return 'icon-moon-inv';
      }
  }
};

export default getWeatherIcon;
