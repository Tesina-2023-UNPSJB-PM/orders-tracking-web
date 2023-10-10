import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { MasterDataDTO } from 'src/app/dtos/master-data/master-data.dto';
import { MasterDataApiService } from 'src/app/orders-management/services/apis/master-data.api.service';
import { LoadCustomerAction } from '../actions/customer.action';
import {
  LoadEmployeeAction
} from '../actions/employee.action';
import {
  LoadMasterDataAction,
  MasterDataActionType,
} from '../actions/master-data.action';
import { LoadServiceOrderStateAction } from '../actions/service-order-state.action';
import { LoadServiceOrderTypeAction } from '../actions/service-order-type.action';
import { LoadReasonsStatusAction } from '../actions/reason.action';

@Injectable({ providedIn: 'root' })
export class MasterDataEffects {
  public masterData$: Observable<Action>;

  constructor(
    private actions$: Actions<LoadMasterDataAction>,
    private store$: Store,
    private readonly masterDataApiService: MasterDataApiService
  ) {
    this.masterData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(MasterDataActionType.FECH_ITEMS),
        switchMap(() =>
          this.masterDataApiService.get().pipe(
            map((masterData) => {
              this.dispatchActions(masterData);
              return new LoadMasterDataAction(masterData);
            })
          )
        )
      )
    );
  }

  private dispatchActions({
    employees = [],
    customers = [],
    serviceOrderStates = [],
    serviceOrderTypes = [],
    reasons = [],
  }: MasterDataDTO): void {
    this.store$.dispatch(new LoadEmployeeAction(employees));

    this.store$.dispatch(new LoadCustomerAction(customers));

    this.store$.dispatch(new LoadServiceOrderTypeAction(serviceOrderTypes));

    this.store$.dispatch(new LoadServiceOrderStateAction(serviceOrderStates));

    this.store$.dispatch(new LoadReasonsStatusAction(reasons));
  }
}
