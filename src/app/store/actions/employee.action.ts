import { Action } from '@ngrx/store';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';

export enum EmployeeActionType {
  LOAD_ITEMS = '[EmployeeActionType] Load EMPLOYEES',
  FECH_ITEMS = '[EmployeeActionType] Fech EMPLOYEES',
}

export class FetchEmployeeAction implements Action {
    readonly type = EmployeeActionType.FECH_ITEMS;
  }
  
  export class LoadEmployeeAction implements Action {
    readonly type = EmployeeActionType.LOAD_ITEMS;
  
    constructor(public payload: EmployeeDTO[]) {}
  }
  
  export type EmployeeAction = LoadEmployeeAction | FetchEmployeeAction;