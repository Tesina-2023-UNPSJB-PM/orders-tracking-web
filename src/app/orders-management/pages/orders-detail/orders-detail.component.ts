import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, map } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderTypeDTO } from 'src/app/dtos/service-order-type.dto';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';

@Component({
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  private _serviceOrder: ServiceOrderDTO | undefined = undefined;
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject();

  public serviceOrderEditionFormGroup: FormGroup<{
    type: FormControl<ServiceOrderTypeDTO | null>;
    state: FormControl<ServiceOrderStateDTO | null>;
    employee: FormControl<EmployeeDTO | null>;
    customer: FormControl<CustomerDTO | null>;
  }>;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.serviceOrderEditionFormGroup = this.formBuilder.group({
      type: new FormControl<ServiceOrderTypeDTO | null>(null),
      state: new FormControl<ServiceOrderStateDTO | null>(null),
      employee: new FormControl<EmployeeDTO | null>(null),
      customer: new FormControl<CustomerDTO | null>(null),
    });
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(map(({ serviceOrder }) => JSON.parse(serviceOrder)))
      .subscribe((serviceOrder) => {
        this._serviceOrder = serviceOrder;
        this.initializeFormData();
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

  protected onSaveChanges(): void {
    /** @todo send changes to the backend. */
  }

  private initializeFormData(): void {
    this.serviceOrderEditionFormGroup.setValue({
      customer: this.customer,
      state: this.state,
      employee: this.employee,
      type: this.type,
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
