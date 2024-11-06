import cloudyImage from '../img/cloudy.jpg';

const changeBackground = function changeBackground(weather) {
  // Array linking to image paths based on weather
  // Change main background
  console.log(weather);
  document.querySelector('main').style.backgroundImage = `url(${cloudyImage})`;
};

export default changeBackground;
