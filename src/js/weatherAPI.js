// Fetch and parse data from Weather API
import {
  uvRating,
  windDirection,
  getTimeFromOffset,
  getLocationName,
  getWeekdayFromDate,
} from './helperFunctions';

export const fetchWeatherData = async (location, geolocation) => {
  // Check if given longitude/latitude or a location
  const unit = document.querySelector('.weather .temperature').classList.contains('celsius')
    ? '°C'
    : '°F';

  let url;

  if (geolocation) {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}?unitGroup=metric&elements=datetime%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cwindspeed%2Cwinddir%2Cvisibility%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription&key=NVAP2BG6FPFH7SUKQV4LSV9L6&contentType=json`;
  } else {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cwindspeed%2Cwinddir%2Cvisibility%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription&key=NVAP2BG6FPFH7SUKQV4LSV9L6&contentType=json`;
  }

  try {
    const response = await fetch(url, {
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json(); // Convert to JSON format
    // Parse necessary data
    const weatherData = {
      location: getLocationName(data, geolocation),
      time: getTimeFromOffset(data.tzoffset),
      currentTemp: `${Math.round(data.currentConditions.temp)}`,
      condition: `${data.currentConditions.conditions}`,
      low: `${Math.round(data.days[0].tempmin)}°`,
      high: `${Math.round(data.days[0].tempmax)}°`,
      uv: `${data.currentConditions.uvindex}`,
      uvDanger: `${uvRating(data.currentConditions.uvindex)}`,
      windMeasure: `${Math.round(data.currentConditions.windspeed)}km/h`,
      windDir: `${windDirection(data.currentConditions.winddir)}`,
      sunriseTime: `${data.currentConditions.sunrise.slice(0, -3)}`,
      sunsetTime: `${data.currentConditions.sunset.slice(0, -3)}`,
      feelsLike: `${Math.round(data.currentConditions.feelslike)}${unit}`,
      precipitationValue: `${data.days[0].precip}mm`,
      visibilityValue: `${data.currentConditions.visibility}km`,
      humidityValue: `${data.currentConditions.humidity}%`,
      dewpointTemperature: `${data.currentConditions.dew}${unit}`,
      hourlyForecast: parseHourlyForecast(
        data.days[0].hours,
        data.days[1].hours,
        getTimeFromOffset(data.tzoffset),
        unit
      ),
      tenDayForecast: parseTenDayForecast(data.days),
    };
    return weatherData;
  } catch (error) {
    return null;
  }
};

const parseHourlyForecast = (forecastDay1, forecastDay2, time, unit) => {
  let parsedHourlyForecast = [];
  let hourlyForecast = forecastDay1;
  let startingHour = parseInt(time.slice(0, 2));

  if (startingHour > 17) {
    // The forecast will roll into the second day.
    forecastDay2.forEach((forecast) => forecastDay1.push(forecast));
  }

  // Get 7 hours worth of forecast, starting from current time
  for (let i = startingHour; i < startingHour + 7; i++) {
    parsedHourlyForecast.push({
      time: hourlyForecast[i].datetime.slice(0, -3),
      condition: hourlyForecast[i].conditions,
      temperature: `${Math.round(hourlyForecast[i].temp)}${unit}`,
    });
  }
  return parsedHourlyForecast;
};

const parseTenDayForecast = (tenDayForecast) => {
  let parsedTenDayForecast = [];
  // Get 10 days worth of forecast, starting from current date

  for (let i = 0; i < 10; i++) {
    parsedTenDayForecast.push({
      day: getWeekdayFromDate(tenDayForecast[i].datetime),
      condition: tenDayForecast[i].conditions,
      tempMin: `${Math.round(tenDayForecast[i].tempmin)}°`,
      tempMax: `${Math.round(tenDayForecast[i].tempmax)}°`,
    });
  }
  return parsedTenDayForecast;
};
