import { Action } from '@ngrx/store';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';

export enum ServiceOrderStateActionType {
  LOAD_ITEMS = '[ServiceOrderState] Load SERVICE_ORDER_STATES',
  FECH_ITEMS = '[ServiceOrderState] Fech SERVICE_ORDER_STATES'
}

export class FetchServiceOrderStateAction implements Action {
  readonly type = ServiceOrderStateActionType.FECH_ITEMS;
}

export class LoadServiceOrderStateAction implements Action {
  readonly type = ServiceOrderStateActionType.LOAD_ITEMS;

  constructor(public payload: ServiceOrderStateDTO[]) {}
}

export type ServiceOrderStateAction = LoadServiceOrderStateAction | FetchServiceOrderStateAction;
