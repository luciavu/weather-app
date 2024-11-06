const getUserLocation = () => {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by this browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(new Error(`Error occurred: ${error.message}`));
      }
    );
  });
};

export default getUserLocation;
