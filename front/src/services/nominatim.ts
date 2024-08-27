import axios, { AxiosRequestConfig } from 'axios';

const a = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 10000,
});

interface IRawAddress {
  building?: string;
  road?: string;
  city: string;
  suburb?: string;
  house_number?: string;
  postcode?: string;
  state?: string;
}

const formatAddress = (addr: IRawAddress) => {
  const parts = [
    addr.building,
    addr.house_number,
    addr.road,
    addr.suburb,
    addr.city,
    addr.state,
    addr.postcode,
  ];
  return parts.filter((part) => part).join(', ');
};

export const reverseGeocode = async (lat: number, lon: number) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/reverse?format=json&lat=${lat}&lon=${lon}`,
  };
  const res = await a.request(config);

  return formatAddress(res.data.address);
};
