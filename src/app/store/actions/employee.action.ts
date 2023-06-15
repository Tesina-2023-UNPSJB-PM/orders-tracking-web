import { Action } from '@ngrx/store';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';

export enum EmployeeActionType {
  LOAD_ITEMS = '[EmployeeActionType] Load EMPLOYEES',
  FECH_ITEMS = '[EmployeeActionType] Fech EMPLOYEES',
}

export class FetchEmployeeAction implements Action {
    readonly type = EmployeeActionType.FECH_ITEMS;
  }
  
  export class LoadEmployeeAction implements Action {
    readonly type = EmployeeActionType.LOAD_ITEMS;
  
    constructor(public payload: MasterDataEmployeeDTO[]) {}
  }
  
  export type EmployeeAction = LoadEmployeeAction | FetchEmployeeAction;