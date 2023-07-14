import { Action } from '@ngrx/store';
import { MasterDataOrderPriorityDTO } from 'src/app/dtos/master-data/master-data-order-priority.dto';

export enum ServiceOrderPriorityActionType {
  LOAD_ITEMS = '[ServiceOrderPriority] Load SERVICE_ORDER_PRIORITIES',
  FECH_ITEMS = '[ServiceOrderPriority] Fech SERVICE_ORDER_PRIORITIES'
}

export class FetchServiceOrderPriorityAction implements Action {
  readonly type = ServiceOrderPriorityActionType.FECH_ITEMS;
}

export class LoadServiceOrderPriorityAction implements Action {
  readonly type = ServiceOrderPriorityActionType.LOAD_ITEMS;

  constructor(public payload: MasterDataOrderPriorityDTO[]) {}
}

export type ServiceOrderPriorityAction = LoadServiceOrderPriorityAction | FetchServiceOrderPriorityAction;
