import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, lastValueFrom, map, switchMap } from 'rxjs';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderTypeDTO } from 'src/app/dtos/service-order-type.dto';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
import { ServiceOrderApiService } from '../../services/apis/service-order.api.service';
import { ServiceOrderDetailResponse } from 'src/app/dtos/service-order-detail.dto';

@Component({
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  private _serviceOrder: ServiceOrderDetailResponse | undefined = undefined;
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject();

  public serviceOrderEditionFormGroup: FormGroup<{
    number: FormControl<string | null>;
    description: FormControl<string | null>;
    type: FormControl<ServiceOrderTypeDTO | null>;
    state: FormControl<ServiceOrderStateDTO | null>;
    employee: FormControl<MasterDataEmployeeDTO | null>;
    customer: FormControl<MasterDataCustomerDTO | null>;
  }>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly serviceOrderApiSrv: ServiceOrderApiService
  ) {
    this.serviceOrderEditionFormGroup = this.formBuilder.group({
      number: new FormControl<string | null>({ value: '', disabled: true }),
      description: new FormControl<string | null>(''),
      type: new FormControl<ServiceOrderTypeDTO | null>(null),
      state: new FormControl<ServiceOrderStateDTO | null>(null),
      employee: new FormControl<MasterDataEmployeeDTO | null>(null),
      customer: new FormControl<MasterDataCustomerDTO | null>(null),
    });
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(switchMap(({ id }) => this.serviceOrderApiSrv.getById(id)))
      .subscribe((serviceOrderDetail) => this.initialize(serviceOrderDetail));
  }

  private async initialize(serviceOrderDetail: ServiceOrderDetailResponse) {
    this._serviceOrder = serviceOrderDetail;
    this.initializeFormData();
  }

  protected get number(): string {
    return this._serviceOrder?.number ?? '';
  }

  protected get description(): string {
    return this._serviceOrder?.description ?? '';
  }

  protected get observations(): string {
    return ''; //this._serviceOrder?.observations ?? '';
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
    //this._serviceOrder.observations = observations;
  }

  protected get employee(): MasterDataEmployeeDTO {
    return this._serviceOrder?.execution
      ?.executorEmployee as MasterDataEmployeeDTO;
  }

  protected get customer(): MasterDataCustomerDTO {
    return this._serviceOrder?.customer as MasterDataCustomerDTO;
  }

  protected get state(): ServiceOrderStateDTO {
    return this._serviceOrder?.status as ServiceOrderStateDTO;
  }

  protected get type(): ServiceOrderTypeDTO | null {
    return this._serviceOrder?.type ?? null; //this._serviceOrder?.type as ServiceOrderTypeDTO;
  }

  protected onUpdateServiceOrder(): void {
    /** @todo send changes to the backend. */
  }

  private initializeFormData(): void {
    this.serviceOrderEditionFormGroup.setValue({
      number: this.number,
      description: this.description,
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
