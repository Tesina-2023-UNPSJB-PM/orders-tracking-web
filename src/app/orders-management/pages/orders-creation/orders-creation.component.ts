import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';

import { AddressDTO } from 'src/app/dtos/address.dto';
import { MasterDataOrderPriorityDTO } from 'src/app/dtos/master-data/master-data-order-priority.dto';
import { SectorDTO } from 'src/app/dtos/sector.dto';
import {
  CreateServiceOrderDTO,
  ServiceOrderDTO,
} from 'src/app/dtos/service-order.dto';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';
import { CustomerApiService } from '../../services/apis/customer.api.service';
import { ServiceOrderApiService } from '../../services/apis/service-order.api.service';
@Component({
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.scss'],
})
export class OrdersCreationComponent {
  private _serviceOrder: ServiceOrderDTO | undefined = undefined;
  private readonly valueStatusDefault = { code: 'PENDING', name: 'Pendiente' };

  public formMain: FormGroup<{
    formBasic: FormGroup<{
      number: FormControl<string | null>;
      description: FormControl<string | null>;
      type: FormControl<MasterDataOrderTypeDTO | null>;
      state: FormControl<MasterDataOrderStatusDTO | null>;
      priority: FormControl<MasterDataOrderPriorityDTO | null>;
      customer: FormControl<MasterDataCustomerDTO | null>;
    }>;
    formExecution: FormGroup<{
      sector: FormControl<SectorDTO | null>;
      employee: FormControl<MasterDataEmployeeDTO | null>;
      estimatedResolutionDate: FormControl<Date | null>;
      estimatedResolutionTime: FormControl<string | null>;
      observationsExecution: FormControl<string | null>;
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
    }>
  }>;

  constructor(
    private readonly serviceOrderApi: ServiceOrderApiService,
    private readonly customerApi: CustomerApiService,
    private readonly notifier: NotifierService,
    private formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formMain = this.formBuilder.group({
      formBasic: this.formBuilder.group({
        number: new FormControl<string | null>(''),
        description: new FormControl<string | null>(''),
        type: new FormControl<MasterDataOrderTypeDTO | null>(null),
        state: new FormControl<MasterDataOrderStatusDTO | null>(
          this.valueStatusDefault
        ),
        priority: new FormControl<MasterDataOrderPriorityDTO | null>(null),
        customer: new FormControl<MasterDataCustomerDTO | null>(null),
      }),
      formExecution: this.formBuilder.group({
        sector: new FormControl<SectorDTO | null > (null),
        employee: new FormControl<MasterDataEmployeeDTO | null>(null),
        estimatedResolutionDate: new FormControl<Date | null>(null),
        estimatedResolutionTime: new FormControl<string | null>('12:00'),
        observationsExecution: new FormControl<string | null>(null),
      }),
      formLocation: this.formBuilder.group({
        descriptionAddress: new FormControl<string | null> ({ value: null, disabled: true }),
        cityAddress: new FormControl<string | null>({ value: null, disabled: true }),
        zipCodeAddress: new FormControl<string | null>({ value: null, disabled: true }),
        stateAddress: new FormControl<string | null>({ value: null, disabled: true }),
        countryAddress: new FormControl<string | null>({ value: null, disabled: true }),
        latitudeAddress: new FormControl<string | null>({ value: null, disabled: true }),
        longitudeAddress: new FormControl<string | null>({ value: null, disabled: true }),
        referenceInfo: new FormControl<string | null>(null),
      }),
    });
  }

  protected get number(): string {
    return this._serviceOrder?.number ?? '';
  }

  protected get description(): string {
    return this._serviceOrder?.description ?? '';
  }

  protected get observations(): string {
    return this._serviceOrder?.observations ?? '';
  }

  protected set number(number: string) {
    if (!this._serviceOrder) return;
    this._serviceOrder.number = number;
  }

  protected set description(description: string) {
    if (!this._serviceOrder) return;
    this._serviceOrder.description = description;
  }

  protected set observations(observations: string) {
    if (!this._serviceOrder) return;
    this._serviceOrder.observations = observations;
  }

  protected get employee(): MasterDataEmployeeDTO {
    return { firstName: 'Fake', lastName: 'Fake' } as MasterDataEmployeeDTO;
  }

  protected get customer(): MasterDataCustomerDTO {
    return { firstName: 'Fake', lastName: 'Fake' } as MasterDataCustomerDTO;
  }

  protected get state(): MasterDataOrderStatusDTO {
    return this._serviceOrder?.status as MasterDataOrderStatusDTO;
  }

  protected get type(): MasterDataOrderTypeDTO {
    return this._serviceOrder?.type as MasterDataOrderTypeDTO;
  }

  protected onCreateServiceOrder(): void {
    const request = this.getCreateRequest();

    this.serviceOrderApi.save(request).subscribe({
      next: (_) => {
        this.notifier.pushSuccess('Orden de servicio creada');
        this.goBack();
      },
      error: (err) => {
        this.notifier.pushError(err.message);
      },
    });
  }

  public onModelChanged(value: MasterDataCustomerDTO): void {
    if (value?.id) {
      this.customerApi.getById(value.id)
        .subscribe({
          next: (value) => this.setValuesAddressFormControls(value.address)
        });
    }
  }

  private setValuesAddressFormControls(address?: AddressDTO): void {
    if (!address) return;

    const formLocation = this.formMain.get('formLocation');

    formLocation?.patchValue({
      descriptionAddress: address.description ?? null,
      cityAddress: address.city ?? null,
      countryAddress: address.country ?? null,
      stateAddress: address.state ?? null,
      zipCodeAddress: address.zipCode ?? null,
      latitudeAddress: address.latitude?.toString() ?? null,
      longitudeAddress: address.longitude?.toString() ?? null,
      referenceInfo: ''
    });
  }

  protected onCancel(): void {
    this.goBack();
  }

  private goBack(): void {
    const { ORDERS_LIST } = ORDERS_MANAGEMENT_ROUTES;

    this.router.navigate([ORDERS_LIST]);
  }

  private getCreateRequest(): CreateServiceOrderDTO {
    const data = this.formMain.getRawValue();

    return {
      number: data.formBasic.number ?? undefined,
      description: data.formBasic.description ?? undefined,
      priority: data.formBasic.priority ? data.formBasic.priority.code : undefined,
      status: data.formBasic.state ? data.formBasic.state.code : undefined,
      typeId: data.formBasic.type ? data.formBasic.type.id : undefined,
      customerId: data.formBasic.customer ? data.formBasic.customer.id : undefined,
      destination: {
        address: null,
        referenceInfo: data.formLocation?.referenceInfo ?? undefined,
      },
      execution: {
        assignedSectorId: data.formExecution.sector?.id,
        executorEmployeId: data.formExecution.employee ? data.formExecution.employee.id : undefined,
        estimatedResolutionTime:
          this.getEstimatedResolutionDatetime(data.formExecution.estimatedResolutionDate ?? undefined,
                                              data.formExecution.estimatedResolutionTime ?? undefined),
        observations: data.formExecution.observationsExecution ?? undefined,
      },
      detail: undefined,
    };
  }

  private getEstimatedResolutionDatetime(date?: Date, time?: string): Date {
    if (!date) {
      return new Date();
    }
    const theTime = time ? `${time}:00` : '00:00:00'
    const theDate = `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`;
    return new Date(`${theDate} ${theTime}`);
  }
}
