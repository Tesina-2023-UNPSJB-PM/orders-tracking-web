import { Action } from '@ngrx/store';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';

export enum ServiceOrderStateActionType {
  LOAD_ITEMS = '[ServiceOrderState] Load SERVICE_ORDER_STATES',
  FECH_ITEMS = '[ServiceOrderState] Fech SERVICE_ORDER_STATES'
}

export class FetchServiceOrderStateAction implements Action {
  readonly type = ServiceOrderStateActionType.FECH_ITEMS;
}

export class LoadServiceOrderStateAction implements Action {
  readonly type = ServiceOrderStateActionType.LOAD_ITEMS;

  constructor(public payload: MasterDataOrderStatusDTO[]) {}
}

export type ServiceOrderStateAction = LoadServiceOrderStateAction | FetchServiceOrderStateAction;
