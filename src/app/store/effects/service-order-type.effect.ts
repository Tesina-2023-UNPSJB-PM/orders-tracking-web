import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { ServiceOrderApiService } from 'src/app/orders-management/services/apis/service-order.api.service';
import { LoadServiceOrderTypeAction, ServiceOrderTypeActionType } from '../actions/service-order-type.action';

@Injectable({ providedIn: 'root' })
export class ServiceOrderTypeEffects {
  public serviceOrderType$: Observable<Action>;

  constructor(
    private actions$: Actions<LoadServiceOrderTypeAction>,
    private serviceOrderApiService: ServiceOrderApiService
  ) {
    this.serviceOrderType$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ServiceOrderTypeActionType.FECH_ITEMS),
        switchMap(() =>
          this.serviceOrderApiService
            .getServiceOrderTypes()
            .pipe(map((value) => new LoadServiceOrderTypeAction(value)))
        )
      )
    );
  }
}
