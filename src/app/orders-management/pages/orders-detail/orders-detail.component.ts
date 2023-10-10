import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { ReplaySubject, switchMap, take } from 'rxjs';
import { ServiceOrderDetailResponse } from 'src/app/dtos/service-order-detail.dto';
import { ServiceOrderDetailToUpdateDtoPipe } from '../../pipes/dtos/service-order-detail-to-update-dto.pipe';
import { ServiceOrderApiService } from '../../services/apis/service-order.api.service';
import {
  OrderDetailFormType,
  createOrderDetailForm,
  initializeFormData,
} from './order-detail-form-util';
import {
  APP_MAP_INITIAL_REGION,
  APP_MAP_OPTIONS,
} from 'src/app/orders-tracking/constants/map.constants';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { ServiceOrderUpdateRequestDTO } from 'src/app/dtos/service-order-update.dto';
import { AddressDTO } from 'src/app/dtos/service-order.dto';
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';

@Component({
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;
  private _serviceOrder: ServiceOrderDetailResponse | undefined = undefined;
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject();

  protected submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  formMain: OrderDetailFormType;

  public selectedLocation: google.maps.LatLng | null = null;
  public region: google.maps.LatLng = new google.maps.LatLng(
    APP_MAP_INITIAL_REGION.lat,
    APP_MAP_INITIAL_REGION.lng
  );

  public options: google.maps.MapOptions = APP_MAP_OPTIONS;

  public infoContent = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly serviceOrderApiSrv: ServiceOrderApiService,
    private readonly serviceOrderDetailToUpdateDtoPipe: ServiceOrderDetailToUpdateDtoPipe,
    private readonly router: Router
  ) {
    this.formMain = createOrderDetailForm(formBuilder);
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(switchMap(({ id }) => this.serviceOrderApiSrv.getById(id)))
      .subscribe((serviceOrderDetail) => this.initialize(serviceOrderDetail));
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  private get coordinate(): { latitude: any; longitude: any } {
    if (!this._serviceOrder)
      return { latitude: undefined, longitude: undefined };
    const { destination } = this._serviceOrder;

    if (!destination) return { latitude: undefined, longitude: undefined };

    const { address } = destination;

    if (!address) return { latitude: undefined, longitude: undefined };

    const { latitude, longitude } = address;

    return { latitude, longitude };
  }

  private async initialize(serviceOrderDetail: ServiceOrderDetailResponse) {
    this._serviceOrder = serviceOrderDetail;

    initializeFormData(this.formMain, serviceOrderDetail);

    const { latitude, longitude } = this.coordinate;

    this.selectedLocation = new google.maps.LatLng(
      latitude ?? 0,
      longitude ?? 0
    );
  }

  private get address(): AddressDTO | undefined | null {
    const { formLocation } = this.formMain.getRawValue();
    if (!formLocation || !this.selectedLocation) return undefined;
    console.log(
      '🚀 ~ file: orders-detail.component.ts:90 ~ OrdersDetailComponent ~ getaddress ~ this.selectedLocation:',
      this.selectedLocation
    );
    const { latitude, longitude } = this.coordinate;
    const {
      cityAddress = '',
      countryAddress = '',
      descriptionAddress = '',
      stateAddress = '',
      zipCodeAddress = '',
    } = formLocation;
    return {
      city: cityAddress ?? '',
      country: countryAddress ?? '',
      description: descriptionAddress ?? '',
      latitude: latitude ?? undefined,
      longitude: longitude ?? undefined,
      state: stateAddress ?? '',
      zipCode: zipCodeAddress ?? '',
    };
  }

  private getUpdateRequest(): ServiceOrderUpdateRequestDTO {
    const data = this.formMain.getRawValue();
    return {
      id: this._serviceOrder?.id,
      number: data.formBasic.number ?? undefined,
      description: data.formBasic.description ?? undefined,
      priority: data.formBasic.priority
        ? data.formBasic.priority.code
        : undefined,
      status: data.formBasic.state ? data.formBasic.state.code : undefined,
      typeId: data.formBasic.type ? data.formBasic.type.id : undefined,
      customerId: data.formBasic.customer
        ? data.formBasic.customer.id
        : undefined,
      destination: {
        address: this.address ?? undefined,
        referenceInfo: data.formLocation?.referenceInfo ?? undefined,
      },
      execution: {
        assignedSectorId: data.formExecution.sector?.id,
        executorEmployeId: data.formExecution.employee
          ? data.formExecution.employee.id
          : undefined,
        observations: data.formExecution.observationsExecution ?? undefined,
      },
    };
  }

  protected onUpdateServiceOrder(): void {
    if (!this._serviceOrder) return;

    this.submitBtnState = ClrLoadingState.LOADING;

    const updateBody = this.getUpdateRequest();

    this.serviceOrderApiSrv
      .updateById(updateBody)
      .pipe(take(1))
      .subscribe({
        next: () => (this.submitBtnState = ClrLoadingState.SUCCESS),
        error: () => (this.submitBtnState = ClrLoadingState.ERROR),
      });
  }

  onCancel() {
    this.router.navigate([MAIN_ROUTES.DASHBOARD, MAIN_ROUTES.ORDERS_MANAGEMENT ,ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST]);
  }
  onModelChanged($event: any) {
    throw new Error('Method not implemented.');
  }

  public openInfo(marker: any, content: string): void {
    this.infoContent = content;
    this.info?.open(marker);
  }
}
