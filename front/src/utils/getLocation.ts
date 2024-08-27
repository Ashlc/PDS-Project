export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error('Geolocalização não é suportada no navegador.'));
    }
  });
};
