import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
import { ServiceOrderApiService } from 'src/app/orders-management/services/apis/service-order.api.service';
import { ORDERS_MANAGEMENT_ROUTES } from '../../constants/routes.constant';
import { ServiceOrderFilters } from '../../interfaces/service-order-filters.interface';

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  public serviceOrders: ServiceOrderDTO[] = [];
  public filtersFormGroup: FormGroup<{
    employee: FormControl<EmployeeDTO | null>;
    customer: FormControl<CustomerDTO | null>;
    state: FormControl<ServiceOrderStateDTO | null>;
    creationDate: FormControl<Date | null>;
  }>;

  constructor(
    private readonly serviceOrderApiSrv: ServiceOrderApiService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.filtersFormGroup = this.formBuilder.group({
      employee: new FormControl<EmployeeDTO | null>(null),
      customer: new FormControl<CustomerDTO | null>(null),
      state: new FormControl<ServiceOrderStateDTO | null>(null),
      creationDate: new FormControl<Date | null>(null),
    });

    this.filtersFormGroup.valueChanges
      .pipe(
        takeUntil(this._destroy),
        map((filtersFormValues) => filtersFormValues as ServiceOrderFilters)
      )
      .subscribe((serviceOrderFilters: ServiceOrderFilters) =>
        this.findServiceOrders(serviceOrderFilters)
      );
  }

  ngOnInit(): void {
    this.findServiceOrders();
  }

  public onCreateServiceOrder(): void {
    const { ORDERS_CREATION } = ORDERS_MANAGEMENT_ROUTES;

    this.router.navigate([ORDERS_CREATION]);
  }

  public onViewDetail(serviceOrder: ServiceOrderDTO): void {
    const { ORDERS_DETAIL } = ORDERS_MANAGEMENT_ROUTES;

    this.router.navigate([ORDERS_DETAIL], {
      queryParams: { serviceOrder: JSON.stringify(serviceOrder) },
    });
  }

  private findServiceOrders(serviceOrderFilters?: ServiceOrderFilters): void {
    console.log(serviceOrderFilters);
    this.serviceOrderApiSrv
      .get(serviceOrderFilters)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (serviceOrders: ServiceOrderDTO[]) =>
          (this.serviceOrders = serviceOrders),
        error: (error) => console.error(error),
      });
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }
}
