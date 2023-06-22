import { Component } from '@angular/core';

@Component({
  templateUrl: './general-map.page.html',
  styleUrls: ['./general-map.page.css'],
})
export class GeneralMapPage {
  zoom = 16;
  center: google.maps.LatLngLiteral = {
    lat: -42.7692,
    lng: -65.03851,
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
}
