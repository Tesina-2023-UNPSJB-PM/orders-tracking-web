import { Action } from "@ngrx/store";
import { MasterDataReasonStatusDTO } from "src/app/dtos/master-data/master-data-reason-status.dto";

export enum ReasonsStatusActionType {
  LOAD_ITEMS = '[ReasonStatus] Load REASONS_STATUS',
  FECH_ITEMS = '[ServiceOrderType] Fech REASONS_STATUS'
}

export class FetchReasonsStatusAction implements Action {
  readonly type = ReasonsStatusActionType.FECH_ITEMS;
}

export class LoadReasonsStatusAction implements Action {
  readonly type = ReasonsStatusActionType.LOAD_ITEMS;

  constructor(public payload: MasterDataReasonStatusDTO[]) {}
}

export type ReasonsStatusActions = LoadReasonsStatusAction | FetchReasonsStatusAction;
