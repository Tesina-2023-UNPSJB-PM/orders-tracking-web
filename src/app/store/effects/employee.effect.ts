import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { EmployeeApiService } from 'src/app/orders-management/services/apis/employee.api.service';
import {
    EmployeeActionType,
    LoadEmployeeAction,
} from '../actions/employee.action';

@Injectable({ providedIn: 'root' })
export class EmployeeEffects {
  public employee$: Observable<Action>;

  constructor(
    private actions$: Actions<LoadEmployeeAction>,
    private employeeApiService: EmployeeApiService
  ) {
    this.employee$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EmployeeActionType.FECH_ITEMS),
        switchMap(() =>
          this.employeeApiService
            .get()
            .pipe(map((value) => new LoadEmployeeAction(value)))
        )
      )
    );
  }
}
