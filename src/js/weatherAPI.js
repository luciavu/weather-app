// Fetch and parse data from Weather API
import { uvRating, windDirection, getTimeFromOffset, getLocationName } from './helperFunctions';

const fetchWeatherData = async (location) => {
  // Check if given longitude/latitude or a location
  const unit = document.querySelector('.weather .temperature').classList.contains('celsius')
    ? '°C'
    : '°F';
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cwindspeed%2Cwinddir%2Cvisibility%2Cuvindex%2Csevererisk%2Csunrise%2Csunset%2Cconditions%2Cdescription&key=NVAP2BG6FPFH7SUKQV4LSV9L6&contentType=json`,
      {
        mode: 'cors',
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json(); // Convert to JSON format
    console.log(data);
    // Parse necessary data
    const weatherData = {
      location: getLocationName(data.resolvedAddress),
      time: getTimeFromOffset(data.tzoffset),
      currentTemp: `${Math.round(data.currentConditions.temp)}`,
      condition: `${data.currentConditions.conditions}`,
      low: `${Math.round(data.days[0].tempmin)}°`,
      high: `${Math.round(data.days[0].tempmax)}°`,
      uv: `${data.currentConditions.uvindex}`,
      uvDanger: `${uvRating(data.currentConditions.uvindex)}`,
      windMeasure: `${Math.round(data.currentConditions.windspeed)} km/h`,
      windDir: `${windDirection(data.currentConditions.winddir)}`,
      sunriseTime: `${data.currentConditions.sunrise.slice(0, -3)}`,
      sunsetTime: `${data.currentConditions.sunset.slice(0, -3)}`,
      feelsLike: `${Math.round(data.currentConditions.feelslike)}${unit}`,
      precipitationPercent: `${data.currentConditions.precipprob}% chance of rain`,
      precipitationValue: `${data.days[0].precip} mm`,
      visibilityValue: `${data.currentConditions.visibility} km`,
      humidityValue: `${data.currentConditions.humidity}%`,
      dewpointTemperature: `${data.currentConditions.dew}${unit}`,
      hourlyForecast: `${data.days[0].hours}`,
      tenDayForecast: `${data.days}`,
    };
    return weatherData;
  } catch (error) {
    return null;
  }
};

export default fetchWeatherData;
