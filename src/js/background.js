import clearDay from '../img/day/clear.jpg';
import cloudyDay from '../img/day/cloudy.jpg';
import partiallyCloudyDay from '../img/day/partially-cloudy.jpg';

import clearNight from '../img/night/clear.jpg';
import cloudyNight from '../img/night/cloudy.jpg';
import partiallyCloudyNight from '../img/night/partially-cloudy.jpg';

import thunder from '../img/thunder.jpg';
import fog from '../img/fog.jpg';
import rainy from '../img/rainy.jpg';

const setBackground = function setBackground(weather, isMorning) {
  const body = document.querySelector('body');
  // Change main background
  switch (weather) {
    case 'clear':
      if (isMorning) {
        body.style.backgroundImage = `url(${clearDay})`;
        return;
      } else {
        body.style.backgroundImage = `url(${clearNight})`;
        return;
      }
    case 'partiallyCloudy':
      if (isMorning) {
        body.style.backgroundImage = `url(${partiallyCloudyDay})`;
        return;
      } else {
        body.style.backgroundImage = `url(${partiallyCloudyNight})`;
        return;
      }
    case 'cloudy':
      if (isMorning) {
        body.style.backgroundImage = `url(${cloudyDay})`;
        return;
      } else {
        body.style.backgroundImage = `url(${cloudyNight})`;
        return;
      }

    case 'fog':
      body.style.backgroundImage = `url(${fog})`;
      return;
    case 'thunder':
      body.style.backgroundImage = `url(${thunder})`;
      return;
    case 'rain':
      body.style.backgroundImage = `url(${rainy})`;
      return;
  }
};

export default setBackground;
