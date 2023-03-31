import { Component, OnDestroy, OnInit } from '@angular/core'
import { ReplaySubject, takeUntil } from 'rxjs'
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto'
import { ServiceOrderApiService } from 'src/app/services/apis/service-order.api.service'

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject()
  public serviceOrders: ServiceOrderDTO[] = []

  constructor(private readonly serviceOrderApiSrv: ServiceOrderApiService) {}

  ngOnInit(): void {
    this.serviceOrderApiSrv
      .find()
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (serviceOrders: ServiceOrderDTO[]) =>
          (this.serviceOrders = serviceOrders),
        error: (error) => console.error(error),
      })
  }

  ngOnDestroy(): void {
    this._destroy.next(true)
    this._destroy.unsubscribe()
  }
}
