import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';

import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { firstValueFrom, tap } from 'rxjs';
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';
import { MasterDataOrderPriorityDTO } from 'src/app/dtos/master-data/master-data-order-priority.dto';
import { SectorDTO } from 'src/app/dtos/sector.dto';
import {
  AddressDTO,
  CreateServiceOrderDTO
} from 'src/app/dtos/service-order.dto';
import {
  APP_MAP_INITIAL_REGION,
  APP_MAP_OPTIONS,
} from 'src/app/orders-tracking/constants/map.constants';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';
import { CustomerApiService } from '../../services/apis/customer.api.service';
import { ServiceOrderApiService } from '../../services/apis/service-order.api.service';
import { GeocodingService } from '../../services/geocoder.service';

@Component({
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.scss'],
})
export class OrdersCreationComponent {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;
  timeout: any = null;
  public selectedLocation: google.maps.LatLng | null = null;
  public region: google.maps.LatLng = new google.maps.LatLng(
    APP_MAP_INITIAL_REGION.lat,
    APP_MAP_INITIAL_REGION.lng
  );
  private readonly valueStatusDefault: MasterDataOrderStatusDTO = {
    code: 'UNASSIGNED',
    name: 'Sin asignar',
  };
  public infoContent = '';
  public options: google.maps.MapOptions = APP_MAP_OPTIONS;
  public formMain: FormGroup<{
    formBasic: FormGroup<{
      number: FormControl<string | null>;
      description: FormControl<string | null>;
      type: FormControl<MasterDataOrderTypeDTO | null>;
      status: FormControl<MasterDataOrderStatusDTO | null>;
      priority: FormControl<MasterDataOrderPriorityDTO | null>;
      customer: FormControl<MasterDataCustomerDTO | null>;
    }>;
    formExecution: FormGroup<{
      sector: FormControl<SectorDTO | null>;
      employee: FormControl<MasterDataEmployeeDTO | null>;
      estimatedResolutionDateTime: FormControl<Date | null>;
      observationsExecution: FormControl<string | null>;
    }>;
    formInfoAditional: FormGroup<{
      meterNumber: FormControl<string | null>;
      supplyNumber: FormControl<string | null>;
      transformerNumber: FormControl<string | null>;
    }>;
    formLocation: FormGroup<{
      descriptionAddress: FormControl<string | null>;
      cityAddress: FormControl<string | null>;
      zipCodeAddress: FormControl<string | null>;
      stateAddress: FormControl<string | null>;
      countryAddress: FormControl<string | null>;
      latitudeAddress: FormControl<string | null>;
      longitudeAddress: FormControl<string | null>;
      referenceInfo: FormControl<string | null>;
    }>;
  }>;

  constructor(
    private readonly serviceOrderApi: ServiceOrderApiService,
    private readonly customerApi: CustomerApiService,
    private readonly notifier: NotifierService,
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly geocodingService: GeocodingService
  ) {
    this.formMain = this.formBuilder.group({
      formBasic: this.formBuilder.group({
        number: new FormControl<string | null>(''),
        description: new FormControl<string | null>(''),
        type: new FormControl<MasterDataOrderTypeDTO | null>(null),
        status: new FormControl<MasterDataOrderStatusDTO | null>(
          this.valueStatusDefault
        ),
        priority: new FormControl<MasterDataOrderPriorityDTO | null>(null),
        customer: new FormControl<MasterDataCustomerDTO | null>(null),
      }),
      formExecution: this.formBuilder.group({
        sector: new FormControl<SectorDTO | null>(null),
        employee: new FormControl<MasterDataEmployeeDTO | null>(null),
        estimatedResolutionDateTime: new FormControl<Date | null>(null),
        observationsExecution: new FormControl<string | null>(null),
      }),
      formInfoAditional: this.formBuilder.group({
        meterNumber: new FormControl<string | null>(null),
        supplyNumber: new FormControl<string | null>(null),
        transformerNumber: new FormControl<string | null>(null),
      }),
      formLocation: this.formBuilder.group({
        descriptionAddress: new FormControl<string | null>(null),
        cityAddress: new FormControl<string | null>({
          value: 'Puerto Madryn',
          disabled: true,
        }),
        zipCodeAddress: new FormControl<string | null>({
          value: '9120',
          disabled: true,
        }),
        stateAddress: new FormControl<string | null>({
          value: 'Chubut',
          disabled: true,
        }),
        countryAddress: new FormControl<string | null>({
          value: 'Argentina',
          disabled: true,
        }),
        latitudeAddress: new FormControl<string | null>({
          value: null,
          disabled: true,
        }),
        longitudeAddress: new FormControl<string | null>({
          value: null,
          disabled: true,
        }),
        referenceInfo: new FormControl<string | null>(null),
      }),
    });

    this.updateStatusOnEmployeeChanged();
  }

  private updateStatusOnEmployeeChanged() {
    const employeeControl = this.employeeFormControl;
    employeeControl?.valueChanges.subscribe((value) => {
      if (value?.firstName) {
        const statusControl = this.statusFormControl;
        statusControl?.setValue({ code: 'PENDING', name: 'Pendiente' });
      }
    });
  }

  get employeeFormControl() {
    return this.formMain.get('formExecution')?.get('employee');
  }

  get statusFormControl() {
    return this.formMain.get('formBasic')?.get('status');
  }

  protected onCreateServiceOrder(): void {
    const request = this.getCreateRequest();

    this.serviceOrderApi.save(request).subscribe({
      next: (_) => {
        this.notifier.pushSuccess('Orden de servicio creada');
        this.goBack();
      },
      error: (err) => {
        const messageError = err.error.message ?? err.message;
        this.notifier.pushError(messageError);
      },
    });
  }

  public onModelChanged(value: MasterDataCustomerDTO): void {
    if (value?.id) {
      this.customerApi
        .getById(value.id)
        .pipe(
          tap((value) => {
            //this.setValuesAddressFormControls(value.address);
          })
        )
        .subscribe();
    }
  }

  private setValuesAddressFormControls(address?: AddressDTO): void {
    if (!address) return;

    const formLocation = this.formMain.get('formLocation');
    // this.selectedLocation?.
    formLocation?.patchValue({
      descriptionAddress: address.description ?? null,
      cityAddress: address.city ?? null,
      countryAddress: address.country ?? null,
      stateAddress: address.state ?? null,
      zipCodeAddress: address.zipCode ?? null,
      latitudeAddress: null,
      longitudeAddress: null,
      referenceInfo: '',
    });
  }

  protected onCancel(): void {
    this.goBack();
  }

  private goBack(): void {
    const URL_ORDERS_LIST = `${MAIN_ROUTES.DASHBOARD}/${MAIN_ROUTES.ORDERS_MANAGEMENT}/${ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST}`;

    this.router.navigate([URL_ORDERS_LIST]);
  }

  private get address(): AddressDTO | undefined | null {
    const { formLocation } = this.formMain.getRawValue();
    if (!formLocation || !this.selectedLocation) return undefined;
    const lat = this.selectedLocation.lat as any as number;
    const lng = this.selectedLocation.lng as any as number;
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
      latitude: lat ?? undefined,
      longitude: lng ?? undefined,
      state: stateAddress ?? '',
      zipCode: zipCodeAddress ?? '',
    };
  }

  private getCreateRequest(): CreateServiceOrderDTO {
    const data = this.formMain.getRawValue();
    return {
      number: data.formBasic.number ?? undefined,
      description: data.formBasic.description ?? undefined,
      priority: data.formBasic.priority
        ? data.formBasic.priority.code
        : undefined,
      status: data.formBasic.status ? data.formBasic.status.code : undefined,
      typeId: data.formBasic.type ? data.formBasic.type.id : undefined,
      customerId: data.formBasic.customer
        ? data.formBasic.customer.id
        : undefined,
      destination: {
        address: this.address ?? null,
        referenceInfo: data.formLocation?.referenceInfo ?? undefined,
      },
      execution: {
        assignedSectorId: data.formExecution.sector?.id,
        executorEmployeId: data.formExecution.employee
          ? data.formExecution.employee.id
          : undefined,
        estimatedResolutionTime:
          data.formExecution.estimatedResolutionDateTime ?? undefined,
        observations: data.formExecution.observationsExecution ?? undefined,
      },
      detail: {
        numero_medidor: data.formInfoAditional.meterNumber,
        numero_suministro: data.formInfoAditional.supplyNumber,
        numero_transformador: data.formInfoAditional.transformerNumber,
      },
    };
  }

  public openInfo(marker: any, content: string): void {
    this.infoContent = content;
    this.info?.open(marker);
  }

  private get fullAddress(): string {
    const { descriptionAddress, cityAddress, stateAddress, countryAddress } =
      this.formMain.getRawValue().formLocation;
    return `${descriptionAddress}, ${cityAddress}, ${stateAddress}, ${countryAddress}`;
  }

  onKeySearch(event: any) {
    if (!event) return;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      if (event?.keyCode != 13) {
        const res = await firstValueFrom(
          this.geocodingService.getLocation(this.fullAddress)
        );
        const { location } = res.results[0].geometry;

        this.selectedLocation = location;
        this.region = location;
      }
    }, 1000);
  }
}
