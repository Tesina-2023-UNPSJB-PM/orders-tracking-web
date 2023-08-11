import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { map, take } from 'rxjs';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { CheckboxConfig } from 'src/app/shared/components/atoms/checkbox/checkbox.component';
import {
  ORDERS_MARKERS
} from 'src/assets/mocks/service-order/employees-tracking.mock';
import {
  APP_MAP_INITIAL_REGION,
  APP_MAP_OPTIONS,
} from '../../constants/map.constants';
import { CHANNEL } from '../../constants/tracking.constants';
import { EmployeeTrackingDTO } from '../../dtos/employee-tracking.dto';
import { EmployeeMarker } from '../../interfaces/employee-marker.interface';
import { IMarker } from '../../interfaces/marker.interface';
import { OrderMarker } from '../../interfaces/order-marker.interface';
import { EmployeeMarkerPipe } from '../../pipes/employee-marker.pipe';
import { OrderMarkerPipe } from '../../pipes/order-marker.pipe';
import { EmployeeOrdersService } from '../../services/employee-orders.service';
import { OrdersTrackingService } from '../../services/orders-tracking.service';

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

  private _employeeMarkers: EmployeeMarker[] = [];
  private _ordersMarkers: OrderMarker[] = [];

  public infoContent = '';

  public selectedEmployeeFormControl =
    new FormControl<MasterDataEmployeeDTO | null>(null);

  public checkboxFormControl = new FormControl<CheckboxConfig[]>([
    { label: 'OS Pendientes', value: 'pending', selected: false },
  ]);

  constructor(
    private readonly ordersTrackingService: OrdersTrackingService,
    private readonly employeeMarkerPipe: EmployeeMarkerPipe,
    private readonly employeeOrdersService: EmployeeOrdersService,
    private readonly orderMarkerPipe: OrderMarkerPipe
  ) {}

  ngOnInit(): void {
    this.ordersTrackingService
      .subscribeToChannel(this.channedId)
      .pipe(
        map((employeeTracking: EmployeeTrackingDTO) =>
          this.employeeMarkerPipe.transform(employeeTracking)
        )
      )
      .subscribe((employeeMarker: EmployeeMarker) =>
        this.addMarker(employeeMarker)
      );

    this.checkboxFormControl.valueChanges.subscribe((value) => {
      if (value) {
        this.findEmployeeOrders();
      }
    });
  }

  ngAfterViewInit() {
    const bounds = this.getBounds(this.markers);
    this.map?.googleMap?.fitBounds(bounds);
  }

  onClearFilters() {
    this.selectedEmployeeFormControl.setValue(null);
    this.selectedEmployeeFormControl.updateValueAndValidity();

    this.checkboxFormControl.setValue([
      { label: 'OS Pendientes', value: 'pending', selected: false },
    ]);
    this.checkboxFormControl.updateValueAndValidity();
  }

  private addMarker(employeeMarker: EmployeeMarker): void {
    const { title } = employeeMarker;
    const index = this._employeeMarkers.findIndex(
      ({ title: _title }) => _title === title
    );
    if (index < 0) {
      this._employeeMarkers = [...this._employeeMarkers, employeeMarker];
    } else {
      this._employeeMarkers[index] = employeeMarker;
    }
  }

  private findEmployeeOrders(): void {
    if (!this.selectedEmployee) return;
    this.employeeOrdersService
      .getAssignedOrders(this.selectedEmployee.id)
      .pipe(
        take(1),
        map((items) => this.orderMarkerPipe.transform(items))
      )
      .subscribe((orders) => {
        console.log("🚀 ~ file: general-map.page.ts:112 ~ GeneralMapPage ~ .subscribe ~ orders:", orders)
        this._ordersMarkers = orders;
      });
  }

  public get selectedEmployee(): MasterDataEmployeeDTO | null {
    return this.selectedEmployeeFormControl.value;
  }

  public get markers(): IMarker[] {
    const _employeeId = this.selectedEmployee?.id;

    if (_employeeId) {
      const employee = this._employeeMarkers.filter(
        ({ employeeId }) => employeeId === _employeeId
      );
      return this.selectedOrdersPendingCheckbox
        ? [...employee, ...this._ordersMarkers]
        : employee;
    } else {
      return this._employeeMarkers;
    }
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
