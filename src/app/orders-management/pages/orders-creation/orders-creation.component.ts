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
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';

@Component({
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.scss'],
})
export class OrdersCreationComponent {
  private _serviceOrder: ServiceOrderDTO | undefined = undefined;
  private readonly valueStatusDefault = { "code": "UNASSIGNED", "name": "Sin asignar" };

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
      meterNumber: FormControl<string | null>,
      supplyNumber: FormControl<string | null>,
      transformerNumber: FormControl<string | null>
    }>
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
        status: new FormControl<MasterDataOrderStatusDTO | null>(
          this.valueStatusDefault
        ),
        priority: new FormControl<MasterDataOrderPriorityDTO | null>(null),
        customer: new FormControl<MasterDataCustomerDTO | null>(null),
      }),
      formExecution: this.formBuilder.group({
        sector: new FormControl<SectorDTO | null > (null),
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

    this.updateStatusOnEmployeeChanged();
  }

  private updateStatusOnEmployeeChanged() {
    const employeeControl = this.employeeFormControl;
    employeeControl?.valueChanges.subscribe(value => {
      if (value?.firstName) {
        const statusControl = this.statusFormControl;
        statusControl?.setValue({ "code": "PENDING", "name": "Pendiente" });
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
    const URL_ORDERS_LIST  = `${MAIN_ROUTES.DASHBOARD}/${MAIN_ROUTES.ORDERS_MANAGEMENT}/${ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST}`;

    this.router.navigate([URL_ORDERS_LIST]);
  }

  private getCreateRequest(): CreateServiceOrderDTO {
    const data = this.formMain.getRawValue();

    return {
      number: data.formBasic.number ?? undefined,
      description: data.formBasic.description ?? undefined,
      priority: data.formBasic.priority ? data.formBasic.priority.code : undefined,
      status: data.formBasic.status ? data.formBasic.status.code : undefined,
      typeId: data.formBasic.type ? data.formBasic.type.id : undefined,
      customerId: data.formBasic.customer ? data.formBasic.customer.id : undefined,
      destination: {
        address: null,
        referenceInfo: data.formLocation?.referenceInfo ?? undefined,
      },
      execution: {
        assignedSectorId: data.formExecution.sector?.id,
        executorEmployeId: data.formExecution.employee ? data.formExecution.employee.id : undefined,
        estimatedResolutionTime: data.formExecution.estimatedResolutionDateTime ?? undefined,
        observations: data.formExecution.observationsExecution ?? undefined,
      },
      detail: {
        numero_medidor: data.formInfoAditional.meterNumber,
        numero_suministro: data.formInfoAditional.supplyNumber,
        numero_transformador: data.formInfoAditional.transformerNumber,
      },
    };
  }
}
