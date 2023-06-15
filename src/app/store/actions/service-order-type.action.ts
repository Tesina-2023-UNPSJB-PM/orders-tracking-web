import { Action } from '@ngrx/store';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';
export enum ServiceOrderTypeActionType {
  LOAD_ITEMS = '[ServiceOrderType] Load SERVICE_ORDER_TYPES',
  FECH_ITEMS = '[ServiceOrderType] Fech SERVICE_ORDER_TYPES'
}

export class FetchServiceOrderTypeAction implements Action {
  readonly type = ServiceOrderTypeActionType.FECH_ITEMS;
}

export class LoadServiceOrderTypeAction implements Action {
  readonly type = ServiceOrderTypeActionType.LOAD_ITEMS;

  constructor(public payload: MasterDataOrderTypeDTO[]) {}
}

export type ServiceOrderTypeActions = LoadServiceOrderTypeAction | FetchServiceOrderTypeAction;