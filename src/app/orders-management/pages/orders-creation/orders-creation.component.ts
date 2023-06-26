import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';

import {
  CreateServiceOrderDTO,
  ServiceOrderDTO,
} from 'src/app/dtos/service-order.dto';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';
import { ServiceOrderApiService } from '../../services/apis/service-order.api.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { MasterDataOrderPriorityDTO } from 'src/app/dtos/master-data/master-data-order-priority.dto';
import { SectorDTO } from 'src/app/dtos/sector.dto';
@Component({
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.css'],
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
      estimatedResolutionTime: FormControl<Date | null>;
      observationsExecution: FormControl<string | null>;
    }>;
    formLocation: FormGroup<{
      address: FormControl<string | null>;
      referenceInfo: FormControl<string | null>;
    }>
  }>;

  constructor(
    private readonly serviceOrderApi: ServiceOrderApiService,
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
        estimatedResolutionTime: new FormControl<Date | null>(null),
        observationsExecution: new FormControl<string | null>(null),
      }),
      formLocation: this.formBuilder.group({
        address: new FormControl<string | null> (null),
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
        referenceInfo: 'La casa pintada de azul y oro',
      },
      execution: {
        assignedSectorId: 1,
        executorEmployeId: data.formExecution.employee ? data.formExecution.employee.id : undefined,
        assignedTime: new Date(),
        estimatedResolutionTime: new Date('2023-06-25'),
        observations: 'Probando creación de nueva orden',
      },
      detail: {
        numero_medidor: '012454',
      },
    };
  }
}
