// Function to convert to celcius/farenheit
export const convertUnit = (temperature, newUnit) => {
  if (newUnit == 'celsius') {
    // Converting from farenheit -> celsius
    return Math.round((temperature - 32) * (5 / 9));
  } else {
    // Converting from celsius -> farenheit
    return Math.round((9 / 5) * temperature + 32);
  }
};

export const uvRating = (uvIndex) => {
  if (uvIndex >= 11) return 'Extreme';
  if (uvIndex >= 8) return 'Very high';
  if (uvIndex >= 6) return 'High';
  if (uvIndex >= 3) return 'Moderate';
  return 'Low';
};

export const windDirection = (angle) => {
  if (angle >= 348.75 || angle < 11.25) return 'N';
  if (angle >= 11.25 && angle < 33.75) return 'NNE';
  if (angle >= 33.75 && angle < 56.25) return 'NE';
  if (angle >= 56.25 && angle < 78.75) return 'ENE';
  if (angle >= 78.75 && angle < 101.25) return 'E';
  if (angle >= 101.25 && angle < 123.75) return 'ESE';
  if (angle >= 123.75 && angle < 146.25) return 'SE';
  if (angle >= 146.25 && angle < 168.75) return 'SSE';
  if (angle >= 168.75 && angle < 191.25) return 'S';
  if (angle >= 191.25 && angle < 213.75) return 'SSW';
  if (angle >= 213.75 && angle < 236.25) return 'SW';
  if (angle >= 236.25 && angle < 258.75) return 'WSW';
  if (angle >= 258.75 && angle < 281.25) return 'W';
  if (angle >= 281.25 && angle < 303.75) return 'WNW';
  if (angle >= 303.75 && angle < 326.25) return 'NW';
  if (angle >= 326.25 && angle < 348.75) return 'NNW';
  return 'Invalid angle';
};

export const getTimeFromOffset = (timezoneOffset) => {
  // Get UTC time
  const curLocalDate = new Date();
  const utcHour = curLocalDate.getUTCHours();
  const utcMins = curLocalDate.getUTCMinutes();

  // Add timezone offset to the UTC hour
  let adjustedHour = (utcHour + timezoneOffset) % 24;
  if (adjustedHour < 0) {
    adjustedHour += 24;
  }

  // Return current time in queried location
  const adjustedTime = `${adjustedHour.toString().padStart(2, '0')}:${utcMins
    .toString()
    .padStart(2, '0')}`;
  return adjustedTime;
};

export const getLocationName = (data, geolocation = false) => {
  if (geolocation) {
    // Use timezone as location instead "America/New_York" -> "New York"
    const timezone = data.timezone;
    return timezone.split('/')[1].replace('_', ''); // Remove _ if any
  } else {
    const resolvedAddress = data.resolvedAddress;
    // For cases where format similar to: "Tokyo, Japan"
    if (resolvedAddress.includes(',')) {
      return resolvedAddress.split(',')[0].trim(); // E.g. Retrieve 'Tokyo' only
    }
    // Case where address format: "Việt Nam"
    return resolvedAddress; // Return full name
  }
};

export const getWeekdayFromDate = (dateString) => {
  const date = new Date(dateString);
  const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return weekdays[date.getDay()];
};

// Helper function for creating elements
export const createElement = (type, classNames = [], textContent = '') => {
  const element = document.createElement(type);
  if (classNames.length) {
    element.classList.add(...classNames);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

// Determine whether to use morning or night icon/backgrounds using current time and sunset/sunrise time
export const checkIsMorning = (time, sunrise, sunset) => {
  return (
    parseInt(time.slice(0, 2)) <= parseInt(sunset.slice(0, 2)) &&
    parseInt(time.slice(0, 2)) >= parseInt(sunrise.slice(0, 2))
  );
};

// Groups different weather conditions into main condition
export const getWeatherCondition = (condition) => {
  switch (condition.toLowerCase()) {
    // Clear
    case 'clear':
    case 'mostly clear':
    case 'sky unchanged':
      return 'clear';

    // Partially cloudy
    case 'partially cloudy':
    case 'sky coverage decreasing':
    case 'sky coverage increasing':
      return 'partiallyCloudy';

    // Cloudy
    case 'cloudy':
    case 'overcast':
      return 'cloudy';

    // Rain
    case 'light rain':
    case 'rain, overcast':
    case 'rain, partially-cloudy':
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
    case 'rain, partially cloudy':
    case 'precipitation in vicinity':
    case 'heavy freezing drizzle/freezing rain':
      return 'rain';

    // Thunderstorms
    case 'thunderstorm':
    case 'thunderstorm without precipitation':
    case 'lightning without thunder':
    case 'diamond dust':
      return 'thunder';

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
      return 'snow';

    // Mist
    case 'mist':
    case 'fog':
      return 'fog';

    // Wind
    case 'windy':
    case 'wind':
    case 'dust':
    case 'dust storm':
    case 'smoke or haze':
    case 'funnel cloud/tornado':
      return 'windy';

    // If no matches, use basic sun/moon
    default:
      return 'clear';
  }
};
