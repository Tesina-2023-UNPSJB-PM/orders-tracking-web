import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { filter } from 'rxjs';
import { CheckboxConfig } from 'src/app/shared/components/atoms/checkbox/checkbox.component';
import {
  EMPLOYEES_MARKERS,
  ORDERS_MARKERS,
} from 'src/assets/mocks/service-order/employees-tracking.mock';

@Component({
  templateUrl: './general-map.page.html',
  styleUrls: ['./general-map.page.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralMapPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
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
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    maxZoom: 15,
    minZoom: 8,
    styles: this.myStyles,
  };

  private _markers = EMPLOYEES_MARKERS;

  private _ordersMarkers = [];

  public infoContent = '';

  public selectedEmployeeFormControl = new FormControl('');

  public checkboxFormControl = new FormControl<CheckboxConfig[]>([
    { label: 'OS Pendientes', value: 'pending', selected: false },
  ]);

  ngOnInit(): void {
    this.selectedEmployeeFormControl.valueChanges.subscribe((value) => {
      if (!value) this.markers = EMPLOYEES_MARKERS;
      else if(this.selectedOrdersPendingCheckbox) this.markers = [EMPLOYEES_MARKERS[0], ...this.ordersMarkers]
           else this.markers = [EMPLOYEES_MARKERS[0]]
    });

    this.checkboxFormControl.valueChanges.subscribe(() => {
      if (this.selectedOrdersPendingCheckbox)
        this.markers = [...this.markers, ...ORDERS_MARKERS];
      else this.markers = [EMPLOYEES_MARKERS[0]];
    });
  }

  ngAfterViewInit() {
    const bounds = this.getBounds(this.markers);
    console.log(
      '🚀 ~ file: general-map.page.ts:95 ~ GeneralMapPage ~ ngAfterViewInit ~ bounds:',
      bounds
    );
    this.map?.googleMap?.fitBounds(bounds);
  }

  public get selectedEmployee(): string {
    return this.selectedEmployeeFormControl.value ?? '';
  }

  public get markers() {
    return this._markers;
  }

  public set markers(markers: any[]) {
    this._markers = markers;
  }

  public get ordersMarkers() {
    return this.selectedOrdersPendingCheckbox ? ORDERS_MARKERS : [];
  }

  // public set ordersMarkers(ordersMarkers) {
  //   this._ordersMarkers = ordersMarkers;
  // }

  public get selectedOrdersPendingCheckbox(): boolean {
    const { value } = this.checkboxFormControl;
    if (!value) return false;
    const [checkboxConfig] = value;
    const { selected = false } = checkboxConfig;
    return selected;
  }

  public openInfo(marker: any, content: string): void {
    this.infoContent = content;
    this.info?.open(marker);
  }

  private getBounds(markers: any[]) {
    let bounds = new google.maps.LatLngBounds();

    markers.forEach((marker: any) => {
      bounds.extend(
        new google.maps.LatLng(marker.position.lat, marker.position.lng)
      );
    });

    return bounds;
  }
}
