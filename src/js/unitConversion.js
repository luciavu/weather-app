// Function to convert to celcius/farenheit
const convertUnit = (temperature, newUnit) => {
  if (newUnit == 'celsius') {
    // Converting from farenheit -> celsius
    return Math.round((temperature - 32) * (5 / 9));
  } else {
    // Converting from celsius -> farenheit
    return Math.round((9 / 5) * temperature + 32);
  }
};

export default convertUnit;
