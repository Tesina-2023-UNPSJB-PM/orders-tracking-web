const APP_MAP_STYLES = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export const APP_MAP_OPTIONS = {
  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  zoomControl: true,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  maxZoom: 16,
  minZoom: 8,
  styles: APP_MAP_STYLES,
};

export const APP_MAP_INITIAL_REGION = {
  lat: -42.7667,
  lng: -65.0333,
};
