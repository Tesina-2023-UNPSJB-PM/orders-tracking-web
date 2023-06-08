import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderTypeDTO } from 'src/app/dtos/service-order-type.dto';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
@Component({
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.css']
})
export class OrdersCreationComponent {

  private _serviceOrder: ServiceOrderDTO | undefined = undefined;

  public serviceOrderEditionFormGroup: FormGroup<{
    type: FormControl<ServiceOrderTypeDTO | null>;
    state: FormControl<ServiceOrderStateDTO | null>;
    employee: FormControl<EmployeeDTO | null>;
    customer: FormControl<CustomerDTO | null>;
  }>;

  constructor(private formBuilder: FormBuilder) {
    this.serviceOrderEditionFormGroup = this.formBuilder.group({
      type: new FormControl<ServiceOrderTypeDTO | null>(null),
      state: new FormControl<ServiceOrderStateDTO | null>(null),
      employee: new FormControl<EmployeeDTO | null>(null),
      customer: new FormControl<CustomerDTO | null>(null),
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

  protected get employee(): EmployeeDTO {
    return this._serviceOrder?.assignedUser as EmployeeDTO;
  }

  protected get customer(): CustomerDTO {
    return this._serviceOrder?.customer as CustomerDTO;
  }

  protected get state(): ServiceOrderStateDTO {
    return this._serviceOrder?.status as ServiceOrderStateDTO;
  }

  protected get type(): ServiceOrderTypeDTO {
    return this._serviceOrder?.type as ServiceOrderTypeDTO;
  }

  protected onCreateServiceOrder(): void {
    /** @todo send changes to the backend. */
  }

}
