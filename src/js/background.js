import cloudyImage from '../img/cloudy.jpg';

const changeBackground = function changeBackground(weather) {
  // Array linking to image paths based on weather
  // Change main background
  console.log(weather);
  document.querySelector('body').style.backgroundImage = `url(${cloudyImage})`;
};

export default changeBackground;
