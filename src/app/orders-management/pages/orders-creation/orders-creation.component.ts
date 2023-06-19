import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';

import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
@Component({
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.css'],
})
export class OrdersCreationComponent {
  private _serviceOrder: ServiceOrderDTO | undefined = undefined;

  public serviceOrderEditionFormGroup: FormGroup<{
    number: FormControl<string | null>;
    description: FormControl<string | null>;
    type: FormControl<MasterDataOrderTypeDTO | null>;
    state: FormControl<MasterDataOrderStatusDTO | null>;
    employee: FormControl<MasterDataEmployeeDTO | null>;
    customer: FormControl<MasterDataCustomerDTO | null>;
  }>;

  constructor(private formBuilder: FormBuilder) {
    this.serviceOrderEditionFormGroup = this.formBuilder.group({
      number: new FormControl<string | null>(''),
      description: new FormControl<string | null>(''),
      type: new FormControl<MasterDataOrderTypeDTO | null>(null),
      state: new FormControl<MasterDataOrderStatusDTO | null>(null),
      employee: new FormControl<MasterDataEmployeeDTO | null>(null),
      customer: new FormControl<MasterDataCustomerDTO | null>(null),
    });

    this.serviceOrderEditionFormGroup.valueChanges.subscribe((values) =>
      console.log(
        '🚀 ~ file: orders-creation.component.ts:37 ~ OrdersCreationComponent ~ constructor ~ values:',
        values
      )
    );
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
    /** @todo send changes to the backend. */
  }
}
