import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { ServiceOrderApiService } from 'src/app/orders-management/services/apis/service-order.api.service';
import {
    LoadServiceOrderStateAction,
    ServiceOrderStateActionType
} from '../actions/service-order-state.action';

@Injectable({ providedIn: 'root' })
export class ServiceOrderStateEffects {
  public serviceOrderState$: Observable<Action>;

  constructor(
    private actions$: Actions<LoadServiceOrderStateAction>,
    private serviceOrderApiService: ServiceOrderApiService
  ) {
    this.serviceOrderState$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ServiceOrderStateActionType.FECH_ITEMS),
        switchMap(() =>
          this.serviceOrderApiService
            .getServiceOrderStates()
            .pipe(map((value) => new LoadServiceOrderStateAction(value)))
        )
      )
    );
  }
}
