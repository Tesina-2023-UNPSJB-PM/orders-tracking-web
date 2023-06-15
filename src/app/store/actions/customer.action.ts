import { Action } from '@ngrx/store';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';

export enum CustomerActionType {
  LOAD_ITEMS = '[CustomerActionType] Load CUSTOMERS',
  FECH_ITEMS = '[CustomerActionType] Fech CUSTOMERS',
}

export class FetchCustomerAction implements Action {
  readonly type = CustomerActionType.FECH_ITEMS;
}

export class LoadCustomerAction implements Action {
  readonly type = CustomerActionType.LOAD_ITEMS;

  constructor(public payload: MasterDataCustomerDTO[]) {}
}

export type CustomerAction = LoadCustomerAction | FetchCustomerAction;
