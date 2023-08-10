import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { map } from 'rxjs';
import { CheckboxConfig } from 'src/app/shared/components/atoms/checkbox/checkbox.component';
import {
  EMPLOYEES_MARKERS,
  ORDERS_MARKERS,
} from 'src/assets/mocks/service-order/employees-tracking.mock';
import { OrdersTrackingService } from '../../services/orders-tracking.service';
import { CHANNEL } from '../../constants/tracking.constants';
import {
  APP_MAP_INITIAL_REGION,
  APP_MAP_OPTIONS,
} from '../../constants/map.constants';
import { EmployeeMarkerPipe } from '../../pipes/employee-marker.pipe';
import { EmployeeTrackingDTO } from '../../dtos/employee-tracking.dto';
import { EmployeeMarker } from '../../interfaces/employee-marker.interface';

@Component({
  templateUrl: './general-map.page.html',
  styleUrls: ['./general-map.page.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralMapPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;

  private readonly channedId = CHANNEL;

  public options: google.maps.MapOptions = APP_MAP_OPTIONS;

  private _markers: EmployeeMarker[] = [];

  public infoContent = '';

  public selectedEmployeeFormControl = new FormControl('');

  public checkboxFormControl = new FormControl<CheckboxConfig[]>([
    { label: 'OS Pendientes', value: 'pending', selected: false },
  ]);

  constructor(
    private readonly ordersTrackingService: OrdersTrackingService,
    private readonly employeeMarkerMap: EmployeeMarkerPipe
  ) {}

  ngOnInit(): void {
    this.ordersTrackingService
      .subscribeToChannel(this.channedId)
      .pipe(
        map((employeeTracking: EmployeeTrackingDTO) =>
          this.employeeMarkerMap.transform(employeeTracking)
        )
      )
      .subscribe((employeeMarker: EmployeeMarker) => {
        console.log('EMPLOYEE_MARKER', employeeMarker);
        this.addMarker(employeeMarker);
      });

    this.selectedEmployeeFormControl.valueChanges.subscribe((value) => {
      // if (!value) this.markers = EMPLOYEES_MARKERS;
      // else if (this.selectedOrdersPendingCheckbox)
      //   this.markers = [EMPLOYEES_MARKERS[0], ...this.ordersMarkers];
      // else this.markers = [EMPLOYEES_MARKERS[0]];
    });

    this.checkboxFormControl.valueChanges.subscribe(() => {
      // if (this.selectedOrdersPendingCheckbox)
      //   this.markers = [...this.markers, ...ORDERS_MARKERS];
      // else this.markers = [EMPLOYEES_MARKERS[0]];
    });
  }

  ngAfterViewInit() {
    const bounds = this.getBounds(this.markers);
    this.map?.googleMap?.fitBounds(bounds);
  }

  private addMarker(employeeMarker: EmployeeMarker): void {
    const { title } = employeeMarker;
    const index = this._markers.findIndex(
      ({ title: _title }) => _title === title
    );
    if (index < 0) {
      this._markers = [...this._markers, employeeMarker];
    } else {
      this._markers[index] = employeeMarker;
    }
  }

  public get selectedEmployee(): string {
    return this.selectedEmployeeFormControl.value ?? '';
  }

  public get markers() {
    return this._markers;
  }

  public set markers(markers: EmployeeMarker[]) {
    this._markers = markers;
  }

  public get ordersMarkers() {
    return this.selectedOrdersPendingCheckbox ? ORDERS_MARKERS : [];
  }

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

  private getBounds(markers: any[]): google.maps.LatLngBounds {
    let bounds = new google.maps.LatLngBounds();

    if (markers.length === 0) {
      return bounds.extend(
        new google.maps.LatLng(
          APP_MAP_INITIAL_REGION.lat,
          APP_MAP_INITIAL_REGION.lng
        )
      );
    }

    markers.forEach((marker: any) => {
      bounds.extend(
        new google.maps.LatLng(marker.position.lat, marker.position.lng)
      );
    });

    return bounds;
  }
}
