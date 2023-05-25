import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { CustomerApiService } from 'src/app/orders-management/services/apis/customer.api.service';
import {
    CustomerActionType,
    LoadCustomerAction,
} from '../actions/customer.action';

@Injectable({ providedIn: 'root' })
export class CustomerEffects {
  public customer$: Observable<Action>;

  constructor(
    private actions$: Actions<LoadCustomerAction>,
    private customerApiService: CustomerApiService
  ) {
    this.customer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerActionType.FECH_ITEMS),
        switchMap(() =>
          this.customerApiService
            .get()
            .pipe(map((value) => new LoadCustomerAction(value)))
        )
      )
    );
  }
}
