import { createContext, ReactNode, useContext, useState } from 'react';

interface GeolocationContextType {
  location: [number, number];
  setLocation: (location: [number, number]) => void;
  getLocation: () => [number, number];
}

const GeolocationContext = createContext<GeolocationContextType>({
  location: [-9.648927, -35.706977],
  setLocation: () => {},
  getLocation: () => [-9.648927, -35.706977],
});

export const useGeolocation = (): GeolocationContextType =>
  useContext(GeolocationContext);

type ContextProps = {
  children: ReactNode;
};

export const GeolocationProvider = ({ children }: ContextProps) => {
  const [location, setLocation] = useState<[number, number]>([
    -9.648927, -35.706977,
  ]);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        return [position.coords.latitude, position.coords.longitude];
      });
    }
    return location;
  };

  return (
    <GeolocationContext.Provider value={{ location, setLocation, getLocation }}>
      {children}
    </GeolocationContext.Provider>
  );
};
