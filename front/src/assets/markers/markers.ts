import L from 'leaflet';
import BlindMarker from './blind_marker.png';
import WheelchairMarker from './wheelchair_marker.svg';

export const markers = {
  wheelchair: L.icon({
    iconUrl: WheelchairMarker,
    iconSize: [38, 49],
    iconAnchor: [17, 49],
    popupAnchor: [-3, -76],
  }),
  blind: L.icon({
    iconUrl: BlindMarker,
    iconSize: [38, 49],
    iconAnchor: [17, 49],
    popupAnchor: [-3, -76],
  }),
};
