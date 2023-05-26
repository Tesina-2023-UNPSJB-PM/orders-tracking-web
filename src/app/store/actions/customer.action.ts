import { Action } from '@ngrx/store';
import { CustomerDTO } from 'src/app/dtos/customer.dto';

export enum CustomerActionType {
  LOAD_ITEMS = '[CustomerActionType] Load CUSTOMERS',
  FECH_ITEMS = '[CustomerActionType] Fech CUSTOMERS',
}

export class FetchCustomerAction implements Action {
    readonly type = CustomerActionType.FECH_ITEMS;
  }
  
  export class LoadCustomerAction implements Action {
    readonly type = CustomerActionType.LOAD_ITEMS;
  
    constructor(public payload: CustomerDTO[]) {}
  }
  
  export type CustomerAction = LoadCustomerAction | FetchCustomerAction;
