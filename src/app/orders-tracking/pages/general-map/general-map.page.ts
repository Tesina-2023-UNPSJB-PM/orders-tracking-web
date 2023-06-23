import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  templateUrl: './general-map.page.html',
  styleUrls: ['./general-map.page.css'],
})
export class GeneralMapPage {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;
  private myStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];

  public zoom = 16;

  public center: google.maps.LatLngLiteral = {
    lat: -42.7692,
    lng: -65.03851,
  };

  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    maxZoom: 15,
    minZoom: 8,
    styles: this.myStyles,
  };

  public markers = [
    {
      position: {
        lat: -42.777981,
        lng: -65.041811,
      },
      label: {
        text: 'Manolo García',
      },
      title: 'Manolo García',
      info: 'Marker info 1',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        anchor: new google.maps.Point(32, 80),
        labelOrigin: new google.maps.Point(30, 30),
      },
    },
    {
      position: {
        lat: -42.760307, //-42.760307, -65.053484
        lng: -65.053484,
      },
      label: {
        text: 'Maria Celeste Gonzalez',
      },
      title: 'Marker title 2',
      info: 'Marker info 2',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        anchor: new google.maps.Point(32, 80),
        labelOrigin: new google.maps.Point(30, 30),
      },
    },
    {
      position: {
        lat: -42.785005, //-42.785005, -65.012929
        lng: -65.012929,
      },
      label: {
        text: 'Sandra Noemi Fernandez',
      },
      title: 'Marker title 2',
      info: 'Marker info 2',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        anchor: new google.maps.Point(32, 80),
        labelOrigin: new google.maps.Point(30, 30),
      },
    },
  ];

  public infoContent = '';

  public openInfo(marker: any, content: string): void {
    this.infoContent = content;
    this.info?.open(marker);
  }
}
