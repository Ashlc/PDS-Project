import L from 'leaflet';

// Pending
import BlindPending from './pending/blind_pending.svg';
import WheelchairPending from './pending/wheelchair_pending.svg';

// Evaluating
import BlindEvaluating from './evaluating/blind_evaluating.svg';
import WheelchairEvaluating from './evaluating/wheelchair_evaluating.svg';

// Ongoing
import BlindOngoing from './ongoing/blind_ongoing.svg';
import WheelchairOngoing from './ongoing/wheelchair_ongoing.svg';

// Done
import BlindDone from './done/blind_done.svg';
import WheelchairDone from './done/wheelchair_done.svg';

const marker = (icon: string): L.Icon =>
  L.icon({
    iconUrl: icon,
    iconSize: [38, 49],
    iconAnchor: [17, 49],
    popupAnchor: [-3, -76],
  });

export const markers = {
  wheelchair: {
    pending: marker(WheelchairPending),
    evaluating: marker(WheelchairEvaluating),
    ongoing: marker(WheelchairOngoing),
    finished: marker(WheelchairDone),
  },
  blind: {
    pending: marker(BlindPending),
    evaluating: marker(BlindEvaluating),
    ongoing: marker(BlindOngoing),
    finished: marker(BlindDone),
  },
};
