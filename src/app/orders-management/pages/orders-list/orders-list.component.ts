import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ReplaySubject, finalize, map, takeUntil } from 'rxjs';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { ServiceOrderItem as ServiceOrderItemDTO } from 'src/app/dtos/service-order-item.dto';
import { ServiceOrderApiService } from 'src/app/orders-management/services/apis/service-order.api.service';
import { Order } from 'src/app/shared/pagination/constants/order.constant';
import { PageOptionsDto } from 'src/app/shared/pagination/page-options.dto';
import { PageDto } from 'src/app/shared/pagination/page.dto';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';
import { ServiceOrderFilters } from '../../interfaces/service-order-filters.interface';
import { GetAllServiceOrderQueryParams } from '../../services/apis/query-params/service-order.query-params';

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  private _paginationOptions: PageOptionsDto = {
    page: 1,
    take: 10,
    order: Order.ASC,
  };
  private _currentPage: PageDto<ServiceOrderItemDTO> | undefined;
  public loading = false;
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
  }

  ngOnInit(): void {
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

  protected get pageSize(): number {
    return this._paginationOptions.take ?? 10;
  }

  protected get serviceOrders(): ServiceOrderItemDTO[] {
    return this._currentPage?.data ?? [];
  }

  protected get total(): number {
    return this._currentPage?.meta.itemCount ?? 0;
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
      this.serviceOrderApiSrv.delete(this.selectedOrder).subscribe({
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
    this.loading = true;
    this.serviceOrderApiSrv
      .getPage(this._paginationOptions, serviceOrderFilters)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (page: PageDto<ServiceOrderItemDTO>) =>
          (this._currentPage = page),
        error: (error) => {
         const messageError =  error.error.message ?? error.message;
         this.notifierService.pushError(messageError);
        },
      });
  }

  protected onRefresh({ page }: ClrDatagridStateInterface): void {
    this._paginationOptions.page = page?.current ?? 1;
    this.findServiceOrders();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }
}
