import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { ServiceOrderItem as ServiceOrderItemDTO } from 'src/app/dtos/service-order-item.dto';
import { ServiceOrderApiService } from 'src/app/orders-management/services/apis/service-order.api.service';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';
import { ServiceOrderFilters } from '../../interfaces/service-order-filters.interface';
import { GetAllServiceOrderQueryParams } from '../../services/apis/query-params/service-order.query-params';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  public serviceOrders: ServiceOrderItemDTO[] = [];
  public filtersFormGroup: FormGroup<{
    employee: FormControl<MasterDataEmployeeDTO | null>;
    customer: FormControl<MasterDataCustomerDTO | null>;
    state: FormControl<MasterDataOrderStatusDTO | null>;
    creationDate: FormControl<Date | null>;
  }>;
  openModalDelete = false;
  selectedOrder?: ServiceOrderItemDTO;

  constructor(
    private readonly serviceOrderApiSrv: ServiceOrderApiService,
    private readonly notifierService: NotifierService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.filtersFormGroup = this.formBuilder.group({
      employee: new FormControl<MasterDataEmployeeDTO | null>(null),
      customer: new FormControl<MasterDataCustomerDTO | null>(null),
      state: new FormControl<MasterDataOrderStatusDTO | null>(null),
      creationDate: new FormControl<Date | null>(null),
    });

    this.filtersFormGroup.valueChanges
      .pipe(
        takeUntil(this._destroy),
        map((filtersFormValues) => filtersFormValues as ServiceOrderFilters)
      )
      .subscribe((serviceOrderFilters: ServiceOrderFilters) => {
        const { employee, customer, creationDate, state } = serviceOrderFilters;
        this.findServiceOrders({
          employeeId: employee?.id,
          customerId: customer?.id,
          statusCode: state?.code,
          creationDate: creationDate?.toISOString() ?? undefined,
        });
      });
  }

  ngOnInit(): void {
    this.findServiceOrders();
  }

  public async onCreateServiceOrder(): Promise<void> {
    const { ORDERS_CREATION } = ORDERS_MANAGEMENT_ROUTES;

    await this.router.navigate([ORDERS_CREATION]);
  }

  public async onViewDetail(serviceOrder: ServiceOrderItemDTO): Promise<void> {
    const { ORDERS_DETAIL } = ORDERS_MANAGEMENT_ROUTES;

    const { id } = serviceOrder;



    await this.router.navigate([ORDERS_DETAIL], {
      queryParams: { id },
    });
  }

  public onDelete(serviceOrder: ServiceOrderItemDTO): void {
    this.openModalDelete = true;
    this.selectedOrder = serviceOrder;
  }

  public deleteOrderSelected(): void {
    if (this.selectedOrder) {
        this.serviceOrderApiSrv.delete(this.selectedOrder)
        .subscribe( {
            next: () => {
                this.notifierService.pushSuccess('Orden de Servicio eliminada.');
                this.findServiceOrders();
            },
            error: (err) => this.notifierService.pushError(err.message),
        });
    }
    this.openModalDelete = false;
  }

  public onClearFilters(): void {
    this.filtersFormGroup.setValue({
      employee: null,
      customer: null,
      state: null,
      creationDate: null,
    });
  }

  private findServiceOrders(
    serviceOrderFilters?: GetAllServiceOrderQueryParams
  ): void {
    this.serviceOrderApiSrv
      .getAll(serviceOrderFilters)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (serviceOrders: ServiceOrderItemDTO[]) =>
          (this.serviceOrders = serviceOrders),
        error: (error) => this.notifierService.pushError(error.message),
      });
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }
}
