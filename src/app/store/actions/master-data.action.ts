import { Action } from "@ngrx/store";
import { MasterDataDTO } from "src/app/dtos/master-data/master-data.dto";

export enum MasterDataActionType {
    FECH_ITEMS = '[MasterDataActionType] Fech EMPLOYEES',
    LOAD_ITEMS = '[MasterDataActionType] Load CUSTOMERS',
}

export class FetchMasterDataAction implements Action {
    readonly type = MasterDataActionType.FECH_ITEMS;
  }
  
  export class LoadMasterDataAction implements Action {
    readonly type = MasterDataActionType.LOAD_ITEMS;
  
    constructor(public payload: MasterDataDTO) {}
  }
  
  export type MasterDataAction = LoadMasterDataAction | FetchMasterDataAction;