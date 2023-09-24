import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { ReplaySubject, switchMap } from 'rxjs';
import { ServiceOrderDetailResponse } from 'src/app/dtos/service-order-detail.dto';
import { ServiceOrderDetailToUpdateDtoPipe } from '../../pipes/dtos/service-order-detail-to-update-dto.pipe';
import { ServiceOrderApiService } from '../../services/apis/service-order.api.service';
import { OrderDetailFormType, createOrderDetailForm, initializeFormData } from './order-detail-form-util';


@Component({
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  private _serviceOrder: ServiceOrderDetailResponse | undefined = undefined;
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject();

  protected submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  formMain: OrderDetailFormType;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly serviceOrderApiSrv: ServiceOrderApiService,
    private readonly serviceOrderDetailToUpdateDtoPipe: ServiceOrderDetailToUpdateDtoPipe
  ) {
    this.formMain = createOrderDetailForm(formBuilder);
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(switchMap(({ id }) => this.serviceOrderApiSrv.getById(id)))
      .subscribe((serviceOrderDetail) => this.initialize(serviceOrderDetail));
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  private async initialize(serviceOrderDetail: ServiceOrderDetailResponse) {
    this._serviceOrder = serviceOrderDetail;
    console.log(serviceOrderDetail);

    initializeFormData(this.formMain, serviceOrderDetail);
  }

  protected onUpdateServiceOrder(): void {
    /*if (!this._serviceOrder) return;

    this.submitBtnState = ClrLoadingState.LOADING;

    const { description, customer, state, employee, type } =
      this.formMain.value;

    this._serviceOrder.execution.executorEmployee = employee;

    const serviceOrderDetail: ServiceOrderDetailResponse = {
      ...this._serviceOrder,
      description: description ?? undefined,
      customer: customer ?? undefined,
      status: state ?? undefined,
      type: type ?? undefined,
    };

    const updateBody: ServiceOrderUpdateRequestDTO =
      this.serviceOrderDetailToUpdateDtoPipe.transform(serviceOrderDetail);

    this.serviceOrderApiSrv.updateById(updateBody).subscribe({
      next: () => (this.submitBtnState = ClrLoadingState.SUCCESS),
      error: () => (this.submitBtnState = ClrLoadingState.ERROR),
    });*/
  }

  onCancel() {
    throw new Error('Method not implemented.');
  }
  onModelChanged($event: any) {
    throw new Error('Method not implemented.');
  }
}
